import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FilaService } from '../service/fila.service';
import { CreateFilaDto } from '../dto/create-fila.dto';

@Controller('filas')
export class FilaController {
  constructor(private readonly filaService: FilaService) {}

  @Get()
  async getAllFilas() {
    return this.filaService.getAllFilas();
  }

  @Get(':id')
  async getFilaById(@Param('id') id: string) {
    return this.filaService.getFilaById(id);
  }
};
