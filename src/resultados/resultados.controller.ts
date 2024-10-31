import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res, ParseIntPipe, HttpException } from '@nestjs/common';
import { ResultadosService } from './resultados.service';
import { CreateResultadoDto } from './dto/create-resultado.dto';
import { UpdateResultadoDto } from './dto/update-resultado.dto';
import { Resultado } from './entities/resultado.entity';

@Controller('resultado')
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

  @Get('bypartida/:partidaId')
  async findByPartida(
    @Param('partidaId', ParseIntPipe) partidaId: number,
  ): Promise<Resultado[]> {
    const resultados = await this.resultadosService.findByPartida(partidaId);
    if (resultados.length > 0) {
      return resultados;
    }
    throw new HttpException(
      `Los registros con id ${partidaId} no se encontraron`,
      HttpStatus.NOT_FOUND,
    );
  }
  
  // @Get(':id')
  // async findOne(@Param('id', ParseIntPipe) id: number): Promise<Resultado> {
  //   const resultado = await this.resultadosService.findOne(id);
  //   return resultado
  // }

  @Patch(':id')
  async update(
    @Param('id') id: number, 
    @Body() updateResultadoDto: UpdateResultadoDto
  ) {
    try {
      const updatedResultado = await this.resultadosService.update(id, updateResultadoDto);
      return updatedResultado;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Se produjo un error: ' + error.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }


  // @Delete(':id')
  // async remove(@Param('id', ParseIntPipe) id: number) {
  //   const resultado = await this.resultadosService.remove(id);
  //   return resultado
  // }
}
