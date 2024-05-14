import { Module } from '@nestjs/common';
import { MetodosPagoService } from './metodospago.service';
import { MetodosPagoController } from './metodospago.controller';

@Module({
  controllers: [MetodosPagoController],
  providers: [MetodosPagoService],
})
export class MetodosPagoModule {}
