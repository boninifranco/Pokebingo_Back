import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ImgSeleccionadasService } from './img-seleccionadas.service';
import { CreateImgSeleccionadaDto } from './dto/create-img-seleccionada.dto';
import { UpdateImgSeleccionadaDto } from './dto/update-img-seleccionada.dto';
import { ImgSeleccionada } from './entities/img-seleccionada.entity';
import { Partida } from 'src/partidas/entities/partida.entity';

@Controller('img-seleccionadas')
export class ImgSeleccionadasController {
  constructor(private readonly imgSeleccionadasService: ImgSeleccionadasService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createImgSeleccionadaDto: CreateImgSeleccionadaDto):Promise<ImgSeleccionada> {
    return await this.imgSeleccionadasService.create(createImgSeleccionadaDto);
  }

  @Get()
  findAll() {
    return this.imgSeleccionadasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imgSeleccionadasService.findOne(+id);
  }

  @Get('partida/:partidaId')
  async findByPartidaId(@Param('partidaId') partidaId: number): Promise<ImgSeleccionada[]> {
    return await this.imgSeleccionadasService.findByPartidaId(partidaId);
  }

  /*@Patch(':id')
  update(@Param('id') id: string, @Body() updateImgSeleccionadaDto: UpdateImgSeleccionadaDto) {
    return this.imgSeleccionadasService.update(+id, updateImgSeleccionadaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imgSeleccionadasService.remove(+id);
  }*/
}
