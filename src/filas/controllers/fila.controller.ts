import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus, ParseIntPipe, HttpCode, UseGuards} from '@nestjs/common';
import { FilaService } from '../service/fila.service';
import { CreateFilaDto } from '../dto/create-fila.dto';
import { UpdateFilaDto } from '../dto/update-fila.dto';
import { Fila } from '../entities/fila.entity';
import { AuthGuard } from 'src/auth/auth/auth.guard';
import { Partida } from 'src/partidas/entities/partida.entity';

@Controller('filas')
export class FilaController {
  constructor(private readonly filaService: FilaService) {}

  @Get('/max')
  async maxIdFila(): Promise<number> {
    const fila = await this.filaService.maxIdFila();
    return fila;
  }
  @Get('ordenadas-desc/:aciertos/:partida')
  @HttpCode(HttpStatus.OK)
  findAllDesc(
    @Param('aciertos',ParseIntPipe) aciertos: number,
  @Param('partida') partida:Partida): Promise<Fila[]> {
    return this.filaService.findAllDesc(partida,aciertos);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Fila> {
    const fila = await this.filaService.obtenerUsuarioDeFila(id);
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

  //@UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: string) {
    return this.filaService.delete(id);
  }

  @Get('aciertos/:cartonId')
public async getAciertosPorCarton(@Param('cartonId') cartonId: number): Promise<number> {
  return await this.filaService.getAciertosPorCarton(cartonId);
}
}
