import {
  Controller,  Get,  Post,  Body,  Patch,  Param,  Delete,  ParseIntPipe,  HttpCode,
  HttpStatus,  Res,  UseGuards,} from '@nestjs/common';
import { RegistroService } from './registro.service';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';
import { Registro } from './entities/registro.entity';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth/auth.guard';

@Controller('registro')
export class RegistroController {
  constructor(private readonly registroService: RegistroService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createRegistroDto: CreateRegistroDto) {
    return this.registroService.create(createRegistroDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.registroService.findAll();
  }

  @Get(':id')
  async findOne(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Registro> {
    const registro = await this.registroService.findOneId(id);
    if (registro) {
      res.status(HttpStatus.FOUND).json(registro);
      return registro;
    }
    res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: `El registro con id ${id} no se encontró` });
  }

  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRegistroDto: UpdateRegistroDto,
  ): Promise<Registro> {
    const registro = await this.registroService.update(id, updateRegistroDto);
    if (registro) {
      res.status(HttpStatus.FOUND).json(registro);
      return registro;
    }
    res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: `El registro con id ${id} no se encontró` });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const registro = await this.registroService.remove(id);
    if (registro) {
      res.status(HttpStatus.FOUND).json(registro);
    }
    res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: `El registro con id ${id} no se encontró` });
  }
}
