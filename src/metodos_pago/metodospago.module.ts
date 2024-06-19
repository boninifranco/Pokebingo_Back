import { Module } from '@nestjs/common';
import { MetodosPagoService } from './metodospago.service';
import { MetodosPagoController } from './metodospago.controller';
import { MetodosPago } from './entities/metodospago.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      MetodosPago
    ]),
  ],
  controllers: [MetodosPagoController],
  providers: [MetodosPagoService],
})
export class MetodosPagoModule {}
