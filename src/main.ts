import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("Geolocation API Assignment")
    .setDescription(
      "Restful API that exposes a route to get “GeoJSON features” of a location given with a geolocation box (bounding box) as input."
    )
    .setVersion("0.1")
    .addTag("routeToLocation")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);
  await app.listen(3000);
}
bootstrap();
