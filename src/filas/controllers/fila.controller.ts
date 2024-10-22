import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus, ParseIntPipe, HttpCode, UseGuards} from '@nestjs/common';
import { FilaService } from '../service/fila.service';
import { CreateFilaDto } from '../dto/create-fila.dto';
import { UpdateFilaDto } from '../dto/update-fila.dto';
import { Fila } from '../entities/fila.entity';
import { AuthGuard } from 'src/auth/auth/auth.guard';

@Controller('filas')
export class FilaController {
  constructor(private readonly filaService: FilaService) {}

  @Get('ordenadas-desc')
  @HttpCode(HttpStatus.OK)
  findAllDesc(): Promise<Fila[]> {
    return this.filaService.findAllDesc();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string): Promise<Fila> {
    const fila = await this.filaService.findOne(id);
    return fila;
  }
  
  @Get('')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Fila[]> {
    return this.filaService.findAll();
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

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: string) {
    return this.filaService.delete(id);
  }

  @Get('aciertos/:cartonId')
public async getAciertosPorCarton(@Param('cartonId') cartonId: number): Promise<number> {
  return await this.filaService.getAciertosPorCarton(cartonId);
}
}
