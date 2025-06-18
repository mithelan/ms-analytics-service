// src/analytics/analytics.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAnalyticsDto } from './dto/create.analytics.dto';
import { AnalyticsService } from './app.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}


 @Get()
async health() {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
  };
}


  @Post()
  async postAnalytics(@Body() dto: CreateAnalyticsDto) {
    await this.analyticsService.recordEvent(dto);
    return { message: 'Event recorded successfully' };
  }
}
