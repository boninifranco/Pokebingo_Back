import { Module } from '@nestjs/common';
import { PartidasService } from './partidas.service';
import { PartidasController } from './partidas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partida } from './entities/partida.entity';
import { Carton } from 'src/cartones/entities/carton.entity';
import { Sala } from 'src/sala/entities/sala.entity';
import { Resultado } from 'src/resultados/entities/resultado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Partida, Carton, Sala, Resultado])],
  controllers: [PartidasController],
  providers: [PartidasService],
})
export class PartidasModule {}
