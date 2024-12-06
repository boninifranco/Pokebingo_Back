import {  Controller,  Get,  Post,  Body,  Patch,  Param,  Delete,  HttpCode,
  HttpStatus,  Res,  ParseIntPipe,  UseGuards,} from '@nestjs/common';
import { PuntajesService } from './puntajes.service';
import { CreatePuntajesDto } from './dto/create-puntajes.dto';
import { UpdatePuntajesDto } from './dto/update-puntajes.dto';
import { Response } from 'express';
import { Puntajes } from './entities/puntajes.entity';
import { AuthGuard } from 'src/auth/auth/auth.guard';

@Controller('puntajes')
export class PuntajesController {
  constructor(private readonly puntajesService: PuntajesService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() createPuntajesDto: CreatePuntajesDto) {
    return this.puntajesService.create(createPuntajesDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.puntajesService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ): Promise<Puntajes> {
    const isPuntaje = await this.puntajesService.findOne(id);
    if (isPuntaje) {
      res.status(HttpStatus.OK).json(isPuntaje);
      return isPuntaje;
    }
    res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: `El puntaje con id ${id} no existe` });
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePuntajesDto: UpdatePuntajesDto,
    @Res() res: Response,
  ): Promise<Puntajes> {
    const isPuntaje = await this.puntajesService.update(+id, updatePuntajesDto);
    if (isPuntaje) {
      res.status(HttpStatus.FOUND).json(isPuntaje);
      return isPuntaje;
    }
    res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: `El puntaje con id ${id} no existe` });
  }

  //@UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const isPuntaje = await this.puntajesService.remove(id);
    if (isPuntaje) {
      res.status(HttpStatus.FOUND).json(isPuntaje);
    }
    res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: `El puntaje con id ${id} no existe` });
  }
}
