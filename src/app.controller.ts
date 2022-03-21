import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("routeToLocation")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("routeToLocation/:bbox")
  async getRouteToLocation(@Param("bbox") bbox: string): Promise<string> {
    const [err, routeLocation] = await this.appService.getRouteToLocation(bbox);
    if (err) {
      // Notify client about the exception
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
    // The valid response is a javascript object of GeoJSON data
    return routeLocation;
  }
}
