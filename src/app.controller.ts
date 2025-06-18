// src/analytics/analytics.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { CreateAnalyticsDto } from './dto/create.analytics.dto';
import { AnalyticsService } from './app.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post()
  async postAnalytics(@Body() dto: CreateAnalyticsDto) {
    await this.analyticsService.recordEvent(dto);
    return { message: 'Event recorded successfully' };
  }
}
