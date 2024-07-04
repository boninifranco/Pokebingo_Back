import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus, ParseIntPipe, HttpCode} from '@nestjs/common';
import { FilaService } from '../service/fila.service';
import { CreateFilaDto } from '../dto/create-fila.dto';
import { UpdateFilaDto } from '../dto/update-fila.dto';
import { Fila } from '../entities/fila.entity';

@Controller('filas')
export class FilaController {
  constructor(private readonly filaService: FilaService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Fila[]> {
    return this.filaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string): Promise<Fila> {
    const fila = await this.filaService.findOne(id);
    return fila;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createFilaDto: CreateFilaDto): Promise<Fila> {
    return this.filaService.create(createFilaDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateFilaDto: UpdateFilaDto,
  ): Promise<Fila> {
    const updatedFila = await this.filaService.update(id, updateFilaDto);
    return updatedFila;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: string) {
    return this.filaService.delete(id);
  }
}
