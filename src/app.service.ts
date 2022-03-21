import { Injectable } from "@nestjs/common";
import axios from "axios";
import * as osmtogeojson from "osmtogeojson";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  // READ:
  // API DOCS: https://wiki.openstreetmap.org/wiki/API_v0.6#Retrieving_map_data_by_bounding_box:_GET_.2Fapi.2F0.6.2Fmap
  // OSM TO GEOJSON CONVERTING PACKAGE: https://www.npmjs.com/package/osmtogeojson
  async getRouteToLocation(bbox: string) {
    let geoJsonData;
    try {
      const res = await axios.get(
        `https://www.openstreetmap.org/api/0.6/map?bbox=${bbox}`
      );
      geoJsonData = osmtogeojson(res?.data);
    } catch (ex) {
      console.error(ex);
    }
    // The result is a javascript object of GeoJSON data or undefined in case of exception
    return geoJsonData;
  }
}
