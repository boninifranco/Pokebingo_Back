import { Module } from '@nestjs/common';
import { DesempenioService } from './desempenio.service';
import { DesempenioController } from './desempenio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Desempenio } from './entities/desempenio.entity';
import { RegistroModule } from 'src/registro/registro.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Desempenio
    ]),
    RegistroModule
  ],  
  controllers: [DesempenioController],
  providers: [DesempenioService],
  
})
export class DesempenioModule {}
