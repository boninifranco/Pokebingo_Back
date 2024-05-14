import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PremiosService } from './premios.service';
import { CreatePremiosDto } from './dto/create-premios.dto';
import { UpdatePremiosDto } from './dto/update-premios.dto';

@Controller('Premios')
export class PremiosController {
  constructor(private readonly premiosService: PremiosService) {}

  @Post()
  create(@Body() createPremiosDto: CreatePremiosDto) {
    return this.premiosService.create(createPremiosDto);
  }

  @Get()
  findAll() {
    return this.premiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.premiosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRegistroDto: UpdatePremiosDto) {
    return this.premiosService.update(+id, UpdatePremiosDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.premiosService.remove(+id);
  }
}
