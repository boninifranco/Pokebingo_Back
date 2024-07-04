import { Controller, Get, Post, Body, Param, Delete, HttpStatus, HttpCode, Put, ParseIntPipe} from '@nestjs/common';
import { PartidasService } from './partidas.service';
import { CreatePartidaDto } from './dto/create-partida.dto';
import { UpdatePartidaDto } from './dto/update-partida.dto';
import { Partida } from './entities/partida.entity';

@Controller('partidas')
export class PartidasController {
  constructor(private readonly partidasService: PartidasService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPartidaDto: CreatePartidaDto): Promise<Partida> {
    return this.partidasService.create(createPartidaDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Partida[]> {
    return this.partidasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Partida> {
    const partida = await this.partidasService.findOne(id);
    return partida;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdatePartidaDto: UpdatePartidaDto,
  ): Promise<Partida> {
    const partida = await this.partidasService.update(id, UpdatePartidaDto);
    return partida;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const partida = await this.partidasService.remove(id);
    return partida;
  }
}
