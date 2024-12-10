import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ImgSeleccionadasService } from './img-seleccionadas.service';
import { CreateImgSeleccionadaDto } from './dto/create-img-seleccionada.dto';
import { ImgSeleccionada } from './entities/img-seleccionada.entity';
import { CreateSalieronDto } from './dto/create-salieron.dto';
import { clear } from 'console';

@Controller('img-seleccionadas')
export class ImgSeleccionadasController {
  constructor(private readonly imgSeleccionadasService: ImgSeleccionadasService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createImgSeleccionadaDto: CreateImgSeleccionadaDto):Promise<ImgSeleccionada> {
    return await this.imgSeleccionadasService.create(createImgSeleccionadaDto);
  }

  @Post('/salieron')
  @HttpCode(HttpStatus.CREATED)
  async createSalieron(@Body() createSalieronDto: CreateSalieronDto):Promise<any> {
    return await this.imgSeleccionadasService.createSalieron(createSalieronDto);
  }

  @Get()
  findAll() {
    return this.imgSeleccionadasService.findAll();
  }

  @Get('salieron')
  findAllSalieron() {
    return this.imgSeleccionadasService.findAllSalieron();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imgSeleccionadasService.findOne(+id);
  }

  @Get('partida/:partidaId')
  async findByPartidaId(@Param('partidaId') partidaId: number): Promise<ImgSeleccionada[]> {
    return await this.imgSeleccionadasService.findByPartidaId(partidaId);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.imgSeleccionadasService.remove(id);
  }  
}
