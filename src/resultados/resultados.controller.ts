import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res, ParseIntPipe } from '@nestjs/common';
import { ResultadosService } from './resultados.service';
import { CreateResultadoDto } from './dto/create-resultado.dto';
import { UpdateResultadoDto } from './dto/update-resultado.dto';
import { Resultado } from './entities/resultado.entity';

@Controller('resultados')
export class ResultadosController {
  constructor(private readonly resultadosService: ResultadosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createResultadoDto: CreateResultadoDto) {
    return this.resultadosService.create(createResultadoDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.resultadosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Resultado> {
    const resultado = await this.resultadosService.findOne(id);
    return resultado
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateResultadoDto: UpdateResultadoDto): Promise<Resultado> {
    const resultado = await this.resultadosService.update(id, updateResultadoDto);
    return resultado
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const resultado = await this.resultadosService.remove(id);
    return resultado
  }
}
