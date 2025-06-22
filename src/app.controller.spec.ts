import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsService } from './app.service';
import { CreateAnalyticsDto } from './dto/create.analytics.dto';
import { AnalyticsController } from './app.controller';

describe('AnalyticsController', () => {
  let controller: AnalyticsController;
  let service: AnalyticsService;

  const mockAnalyticsService = {
    recordEvent: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalyticsController],
      providers: [
        {
          provide: AnalyticsService,
          useValue: mockAnalyticsService,
        },
      ],
    }).compile();

    controller = module.get<AnalyticsController>(AnalyticsController);
    service = module.get<AnalyticsService>(AnalyticsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('postAnalytics', () => {
    it('should call recordEvent with correct dto and return success message', async () => {
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

      const result = await controller.postAnalytics(dto);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.recordEvent).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ message: 'Event recorded successfully' });
    });
  });
});
