// src/analytics/dto/create-analytics.dto.ts
import { IsString, IsOptional, IsNumber, IsUUID, IsIP } from 'class-validator';

export class CreateAnalyticsDto {
  @IsUUID()
  event_id: string;

  @IsString()
  user_id: string;

  @IsString()
  session_id: string;

  @IsString()
  event_type: string;

  @IsString()
  page_url: string;

  @IsString()
  referrer_url: string;

  @IsOptional()
  @IsString()
  click_target?: string;

  @IsOptional()
  @IsNumber()
  scroll_depth?: number;

  @IsOptional()
  @IsNumber()
  page_time_ms?: number;

  @IsOptional()
  @IsNumber()
  session_time_ms?: number;

  @IsOptional()
  @IsNumber()
  load_time_ms?: number;

  @IsString()
  user_agent: string;

  @IsNumber()
  screen_height: number;

  @IsNumber()
  screen_width: number;

  @IsString()
  device_type: string;

  @IsString()
  timestamp: string;

  @IsIP()
  ip_address: string;
}
