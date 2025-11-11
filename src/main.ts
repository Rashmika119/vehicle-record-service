import { NestFactory } from '@nestjs/core';
import { VehicleRecordModule } from './vehicleRecord.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(VehicleRecordModule);
  await app.listen(process.env.PORT ?? 4000);

    app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted: true,
      transform:true,
    })
  )
}
bootstrap();
