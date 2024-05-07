import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalaService } from './sala.service';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { Sala } from './entities/sala.entity';

@Controller('sala')
export class SalaController {
  constructor(private readonly salaService: SalaService) {}

  @Post()
  create(@Body() createSalaDto: CreateSalaDto) {
    return this.salaService.create(createSalaDto);
  }

  @Get()
  findAll():Promise<Sala[]> {
    return this.salaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number):Promise <Sala> {
    return this.salaService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.salaService.remove(+id);
  }
}
