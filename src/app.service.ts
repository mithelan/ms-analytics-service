// src/analytics/analytics.service.ts
import { Injectable } from '@nestjs/common';
import { createClient } from '@clickhouse/client';
import { CreateAnalyticsDto } from './dto/create.analytics.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AnalyticsService {
  private readonly client;
  constructor(private readonly configService: ConfigService) {
    this.client = createClient({
      url: this.configService.get<string>('CLICK_HOUSE_URL'),
      username: this.configService.get<string>('CLICK_HOUSE_USERNAME'),
      password: this.configService.get<string>('CLICK_HOUSE_PASSWORD'),
    });
  }

  async recordEvent(dto: CreateAnalyticsDto): Promise<void> {
    try {
      await this.client.insert({
        table: 'web_analytics_events',
        values: [dto],
        format: 'JSONEachRow',
      });
    } catch (error) {
      console.error('Failed to record analytics event:', {
        error: error.message || error,
        data: dto,
      });
    }
  }
}
