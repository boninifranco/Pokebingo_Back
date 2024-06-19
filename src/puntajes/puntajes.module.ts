import { Module } from '@nestjs/common';
import { PuntajesService } from './puntajes.service';
import { PuntajesController } from './puntajes.controller';
import { Puntajes } from './entities/puntajes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Puntajes
    ]),
  ],
  controllers: [PuntajesController],
  providers: [PuntajesService],
})
export class PuntajesModule {}
