import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import validGeoJsonResponse from "./validGeoJsonResponse";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/ (GET)", () => {
    return request(app.getHttpServer())
      .get("/")
      .expect(200)
      .expect("Hello World!");
  });

  // valid bounding box case
  it("/routeToLocation/76.45,64.4,76.47,64.5 (GET)", () => {
    return request(app.getHttpServer())
      .get("/routeToLocation/76.45,64.4,76.47,64.5")
      .expect(200)
      .expect(JSON.stringify(validGeoJsonResponse));
  });

  // too big bounding box case
  it("/routeToLocation/1,2,3,4 (GET)", () => {
    return request(app.getHttpServer())
      .get("/routeToLocation/1,2,3,4")
      .expect(400)
      .expect(
        JSON.stringify({
          statusCode: 400,
          message:
            "The maximum bbox size is 0.25, and your request was too large. Either request a smaller area, or use planet.osm",
        })
      );
  });

  // bounding box with invalid parameters
  it("/routeToLocation/1,1,1,9000 (GET)", () => {
    return request(app.getHttpServer())
      .get("/routeToLocation/1,1,1,9000")
      .expect(400)
      .expect(
        JSON.stringify({
          statusCode: 400,
          message:
            "The latitudes must be between -90 and 90, longitudes between -180 and 180 and the minima must be less than the maxima.",
        })
      );
  });

  // bounding box with no elements case
  it("/routeToLocation/1,1,1,1 (GET)", () => {
    return request(app.getHttpServer())
      .get("/routeToLocation/1,1,1,1")
      .expect(200)
      .expect(
        JSON.stringify({
          type: "FeatureCollection",
          features: [],
        })
      );
  });
});
