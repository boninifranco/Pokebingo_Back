import { Module } from '@nestjs/common';
import { PuntajesService } from './puntajes.service';
import { PuntajesController } from './puntajes.controller';
import { Puntajes } from './entities/puntajes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resultado } from 'src/resultados/entities/resultado.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Puntajes, Resultado
    ]),
  ],
  controllers: [PuntajesController],
  providers: [PuntajesService],
})
export class PuntajesModule {}
