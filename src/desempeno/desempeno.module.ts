import { Module } from '@nestjs/common';
import { DesempenioService } from './desempeno.service';
import { DesempenioController } from './desempeno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Desempenio } from './entities/desempeno.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Desempenio
    ])
  ],  
  controllers: [DesempenioController],
  providers: [DesempenioService],
  
})
export class DesempenoModule {}
