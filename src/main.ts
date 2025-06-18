import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3003;

  try {
    await app.listen(PORT);
    console.log(`✅ App is running on http://localhost:${PORT}`);

  } catch (err) {
    console.error(`❌ Failed to bind to port ${PORT}:`, err.message);
  }
}
bootstrap();
