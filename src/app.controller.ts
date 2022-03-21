import { Controller, Get, Param } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("routeToLocation/:bbox")
  getRouteToLocation(@Param("bbox") bbox: string) {
    return this.appService.getRouteToLocation(bbox);
  }
}
