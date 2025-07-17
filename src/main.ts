import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT || 3003;

  
  app.enableCors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  });
  try {
    await app.listen(PORT, '0.0.0.0');
    console.log(`✅ App is running on http://localhost:${PORT}`);
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.error(`❌ Failed to bind to port ${PORT}:`, err.message);
  }
}
bootstrap();
