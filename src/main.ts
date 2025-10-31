import { NestFactory } from '@nestjs/core';
import { VehicleRecordModule } from './vehicleRecord.module';

async function bootstrap() {
  const app = await NestFactory.create(VehicleRecordModule);
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
