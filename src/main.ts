import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT;
  try {
    await app.listen(PORT, () => console.log(`Running App on Port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
