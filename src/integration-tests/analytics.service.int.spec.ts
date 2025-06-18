import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { AnalyticsService } from '../app.service';
import { CreateAnalyticsDto } from '../dto/create.analytics.dto';

describe('AnalyticsService (integration)', () => {
  let service: AnalyticsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.test' }),
      ],
      providers: [AnalyticsService],
    }).compile();

    service = module.get<AnalyticsService>(AnalyticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should record analytics event', async () => {
    const dto: CreateAnalyticsDto = {
      event_id: '550e8400-e29b-41d4-a716-446655440000',
      user_id: 'user123',
      session_id: 'session456',
      event_type: 'click',
      page_url: 'https://example.com/page',
      referrer_url: 'https://google.com',
      click_target: 'button#submit',
      scroll_depth: 80.5,
      page_time_ms: 1200,
      session_time_ms: 5400,
      load_time_ms: 300,
      user_agent: 'Mozilla/5.0',
      screen_height: 1080,
      screen_width: 1920,
      device_type: 'desktop',
      timestamp: new Date().toISOString(),
      ip_address: '192.168.1.1',
    };

    await expect(service.recordEvent(dto)).resolves.not.toThrow();
  });
});
