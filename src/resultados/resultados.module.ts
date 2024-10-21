import { Module } from '@nestjs/common';
import { ResultadosService } from './resultados.service';
import { ResultadosController } from './resultados.controller';

@Module({
  controllers: [ResultadosController],
  providers: [ResultadosService],
})
export class ResultadosModule {}
