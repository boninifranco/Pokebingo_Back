import { Module } from '@nestjs/common';
import { PartidasService } from './partidas.service';
import { PartidasController } from './partidas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partida } from './entities/partida.entity';
import { Carton } from 'src/cartones/entities/carton.entity';
import { Sala } from 'src/sala/entities/sala.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Partida, Carton, Sala])],
  controllers: [PartidasController],
  providers: [PartidasService],
})
export class PartidasModule {}
