import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CasilleroService } from 'src/casilleros/service/casillero.service';
import { CreateCasilleroDto } from 'src/casilleros/dto/create-casillero.dto';

@Controller('casilleros')
export class CasilleroController {
  constructor(private readonly casilleroService: CasilleroService) {}

  @Get()
  async getAllCasilleros() {
    return this.casilleroService.getAllCasilleros();
  }

  @Get(':id')
  async getCasilleroById(@Param('id') id: string) {
    return this.casilleroService.getCasilleroById(id);
  }

  @Post()
  async createCasillero(@Body() createCasilleroDto: CreateCasilleroDto) {
    return this.casilleroService.createCasillero(createCasilleroDto);
  }

  @Delete(':id')
  async deleteCasillero(@Param('id') id: string) {
    return this.casilleroService.deleteCasillero(id);
  }
}
