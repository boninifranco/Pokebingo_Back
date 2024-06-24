import { Module } from '@nestjs/common';
import { DesempenioService } from './desempenio.service';
import { DesempenioController } from './desempenio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Desempenio } from './entities/desempenio.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Desempenio
    ])
  ],  
  controllers: [DesempenioController],
  providers: [DesempenioService],
  
})
export class DesempenioModule {}
