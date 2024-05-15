import { Module } from '@nestjs/common';
import { FilaController } from '../filas/controllers/fila.controller';
import { FilaService } from '../filas/service/fila.service';

@Module({
  controllers: [FilaController],
  providers: [FilaService],
})
export class FilaModule {}