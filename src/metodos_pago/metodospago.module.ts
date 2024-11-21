import { Module } from '@nestjs/common';
import { MetodosPagoService } from './metodospago.service';
import { MetodosPagoController } from './metodospago.controller';
import { MetodosPago } from './entities/metodospago.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([MetodosPago])],
  controllers: [MetodosPagoController],
  providers: [MetodosPagoService],
})
export class MetodosPagoModule {}
