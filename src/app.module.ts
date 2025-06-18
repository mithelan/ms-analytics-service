import { Module } from '@nestjs/common';
import { AnalyticsController } from './app.controller';
import { AnalyticsService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `.env.${process.env.NODE_ENV || 'development'}.local`,
        `.env.${process.env.NODE_ENV || 'development'}`,
        '.env',
      ],
    }),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AppModule {}
