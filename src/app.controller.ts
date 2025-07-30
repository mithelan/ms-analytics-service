// src/analytics/analytics.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAnalyticsDto } from './dto/create.analytics.dto';
import { AnalyticsService } from './app.service';

@Controller('/')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('/health')
  health() {
    return { status: 'Ok 16.01', env: process.env.NODE_ENV, clickHouse: process.env.CLICK_HOUSE_USERNAME, service: 'Analytics' , version : process.env.APP_VERSION};
  }

  @Post('analytics/create')
  async postAnalytics(@Body() dto: CreateAnalyticsDto) {
    await this.analyticsService.recordEvent(dto);
    return { message: 'Event recorded successfully' };
  }

  @Get('/events')
  async getAnalyticsEvents() {
    return  await this.analyticsService.getAnalyticsEvents();
  }


}
