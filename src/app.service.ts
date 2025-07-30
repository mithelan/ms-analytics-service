// src/analytics/analytics.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
      console.log("this.configService.get<string>('CLICK_HOUSE_URL'): ", this.configService.get<string>('CLICK_HOUSE_URL')
      ,this.configService.get<string>('CLICK_HOUSE_USERNAME'),
      this.configService.get<string>('CLICK_HOUSE_PASSWORD')
    );

      /* eslint-disable @typescript-eslint/no-unsafe-call */
      /* eslint-disable @typescript-eslint/no-unsafe-member-access */
      /* eslint-disable @typescript-eslint/no-unsafe-assignment */
      await this.client.insert({
        table: 'web_analytics_events',
        values: [dto],
        format: 'JSONEachRow',
      });
    } catch (error) {
      console.log("error: ", error);
      console.error('Failed to record analytics event:', {
        error: error.message || error,
        data: dto,
      });
     throw new InternalServerErrorException('Failed to record analytics event');
    }
  }

 async getAnalyticsEvents(): Promise<any[]> {
  try {
    const resultSet = await this.client.query({
      query: 'SELECT * FROM web_analytics_events ORDER BY timestamp DESC LIMIT 100',
      format: 'JSONEachRow',
    });

    const rows = await resultSet.json(); 
    return rows;
  } catch (error) {
    console.error('Failed to fetch analytics events:', {
      error: error.message || error,
    });
    throw new InternalServerErrorException('Failed to fetch analytics events');
  }
}

}
