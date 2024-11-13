import { Controller, Get, Post, Body, Param, Delete, HttpStatus, HttpCode, Put, ParseIntPipe, Patch} from '@nestjs/common';
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

  @Get('/activas')
  @HttpCode(HttpStatus.OK)
  findActivas(): Promise<Partida[]> {
    return this.partidasService.findActivas();
  }
  @Get('/sinCartones')
  @HttpCode(HttpStatus.OK)
  partidasSinCartones(): Promise<Partida[]> {
    return this.partidasService.partidasSinCartones();
  }
  @Get('/conImagenes')
  async getPartidasConImagenes() {
    return this.partidasService.getPartidasConImagenes();
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Partida[]> {
    return this.partidasService.findAll();
  }

  @Get('ultima-partida')
  async getUltimaPartidaActiva() {
    return await this.partidasService.findLastActive();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: Partida): Promise<Partida> {
    const partida = await this.partidasService.findOne(id);
    return partida;
  }

  @Patch(':id')
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
