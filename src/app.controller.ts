// src/analytics/analytics.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAnalyticsDto } from './dto/create.analytics.dto';
import { AnalyticsService } from './app.service';

@Controller('/')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('/analytics/health')
  health() {
    return { status: 'ok', env: process.env.NODE_ENV, clickHouse: process.env.CLICK_HOUSE_USERNAME };
  }

  @Post('analytics/create')
  async postAnalytics(@Body() dto: CreateAnalyticsDto) {
    await this.analyticsService.recordEvent(dto);
    return { message: 'Event recorded successfully' };
  }
}
