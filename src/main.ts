import 'dotenv/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.APP_PORT;

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(port, () => {
    console.log(`API iniciada pela porta: ${port}`);
  });
}
bootstrap();
