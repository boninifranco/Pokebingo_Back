import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PuntajesService } from './puntajes.service';
import { CreatePuntajesDto } from './dto/create-puntajes.dto';
import { UpdatePuntajesDto } from './dto/update-puntajes.dto';

@Controller('puntajes')
export class PuntajesController {
  constructor(private readonly puntajesService: PuntajesService) {}

  @Post()
  create(@Body() createPuntajesDto: CreatePuntajesDto) {
    return this.puntajesService.create(createPuntajesDto);
  }

  @Get()
  findAll() {
    return this.puntajesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.puntajesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePuntajesDto: UpdatePuntajesDto) {
    return this.puntajesService.update(+id, updatePuntajesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.puntajesService.remove(+id);
  }
}
