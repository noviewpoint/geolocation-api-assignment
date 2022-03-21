import { Injectable } from "@nestjs/common";
import fetch from "node-fetch";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  // https://wiki.openstreetmap.org/wiki/API_v0.6#Retrieving_map_data_by_bounding_box:_GET_.2Fapi.2F0.6.2Fmap
  async getRouteToLocation(bbox: string) {
    let data;
    try {
      data = await fetch(
        `https://wiki.openstreetmap.org/api/0.6/map?bbox=${bbox}`
      );
    } catch (ex) {
      console.error(ex);
    }

    return data;
  }
}
