import { Module } from '@nestjs/common';
import { ResultadosService } from './resultados.service';
import { ResultadosController } from './resultados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partida } from 'src/partidas/entities/partida.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Resultado } from './entities/resultado.entity';
import { Puntajes } from 'src/puntajes/entities/puntajes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resultado, Partida, Usuario, Puntajes])],
  controllers: [ResultadosController],
  providers: [ResultadosService],
})
export class ResultadosModule {}
