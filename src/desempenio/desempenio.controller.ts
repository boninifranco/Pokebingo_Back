import {  Controller,  Get,  Post,  Body,  Patch,  Param,  Delete,  ParseIntPipe,
  HttpCode,  HttpStatus,  Res,  UseGuards,} from '@nestjs/common';
import { DesempenioService } from './desempenio.service';
import { CreateDesempenioDto } from './dto/create-desempenio.dto';
import { UpdateDesempenioDto } from './dto/update-desempenio.dto';
import { Response } from 'express';
import { Desempenio } from './entities/desempenio.entity';
import { AuthGuard } from 'src/auth/auth/auth.guard';

@Controller('desempenio')
export class DesempenioController {
  constructor(private readonly desempenioService: DesempenioService) {}

  @Post()
  @HttpCode(HttpStatus.FOUND)
  create(@Body() createDesempenioDto: CreateDesempenioDto) {
    return this.desempenioService.create(createDesempenioDto);
  }

  @Get()
  @HttpCode(HttpStatus.FOUND)
  findAll() {
    return this.desempenioService.findAll();
  }

  @Get(':id')
  async findOne(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Desempenio> {
    const isDesempenio = await this.desempenioService.findOne(id);
    if (isDesempenio) {
      res.status(HttpStatus.FOUND).json(isDesempenio);
    }
    res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: `El desempenio con id ${id} no se encontro` });
    return isDesempenio;
  }

  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDesempenioDto: UpdateDesempenioDto,
  ): Promise<Desempenio> {
    const isDesempenio = await this.desempenioService.update(
      id,
      updateDesempenioDto,
    );
    if (isDesempenio) {
      res.status(HttpStatus.FOUND).json(isDesempenio);
      return isDesempenio;
    }
    res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: `El desempenio con id ${id} no se encontró` });
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const isDesempenio = await this.desempenioService.remove(id);
    if (isDesempenio) {
      res.status(HttpStatus.FOUND).json(isDesempenio);
    }
    res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: `El desempenio con id ${id} no se encontro` });
  }
}
