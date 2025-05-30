import {Controller, Get, Post, Delete, Param, Body, HttpStatus, ParseIntPipe, HttpCode, UseGuards, Patch} from '@nestjs/common';
import { CasilleroService } from '../service/casillero.service';
import { CreateCasilleroDto } from '../dto/create-casillero.dto';
import { UpdateCasilleroDto } from '../dto/update-casillero.dto';
import { Casillero } from '../entities/casillero.entity';
import { AuthGuard } from 'src/auth/auth/auth.guard';

@Controller('casilleros')
export class CasilleroController {
  constructor(private readonly casilleroService: CasilleroService) {}

  @Get('salieron/')
  @HttpCode(HttpStatus.OK)
  findAllDesc(): Promise<Casillero[]> {
    return this.casilleroService.findImagenesSalieron();
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllCasilleros(): Promise<Casillero[]> {
    return this.casilleroService.findAll();
  }

  @Get(':id')
  async getCasilleroById(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<Casillero> {
    const casillero = await this.casilleroService.findOne(id);
    return casillero;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createCasillero(
    @Body() createCasilleroDto: CreateCasilleroDto,
  ): Promise<Casillero> {
    return this.casilleroService.create(createCasilleroDto);
  }

  @Patch(':id')
  async updateCasillero(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateCasilleroDto: UpdateCasilleroDto,
  ): Promise<Casillero> {
    const casillero = await this.casilleroService.update(
      id,
      updateCasilleroDto,
    );
    return casillero;
  }

  @Patch('salir-por-imagen/:imagenId')
async marcarCasillerosPorImagen(
  @Param('imagenId') imagenId: number,
) {
  return this.casilleroService.marcarCasillerosPorImagen(imagenId);
}

  

  //@UseGuards(AuthGuard)
  @Delete(':id')
  async deleteCasillero(@Param('id', ParseIntPipe) id: string) {
    return this.casilleroService.delete(id);
  }
}
