import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PuntajesService } from './puntajes.service';
import { CreatePuntajesDto } from './dto/create-puntajes.dto';
import { UpdatePuntajesDto } from './dto/update-puntajes.dto';

@Controller('Puntajes')
export class PuntajesController {
  constructor(private readonly PuntajesService: PuntajesService) {}

  @Post()
  create(@Body() CreatePuntajesDto: CreatePuntajesDto) {
    return this.PuntajesService.create(CreatePuntajesDto);
  }

  @Get()
  findAll() {
    return this.PuntajesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.PuntajesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePuntajesDto: UpdatePuntajesDto) {
    return this.PuntajesService.update(+id, updatePuntajesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.PuntajesService.remove(+id);
  }
}
