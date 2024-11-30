import {  Controller,  Get,  Post,  Body,  Patch,  Param,  Delete,  HttpCode,
  HttpStatus,  Res,  ParseIntPipe,  UseGuards} from '@nestjs/common';
import { PremiosService } from './premios.service';
import { CreatePremiosDto } from './dto/create-premios.dto';
import { UpdatePremiosDto } from './dto/update-premios.dto';
import { Premios } from './entities/premios.entity';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth/auth.guard';



@Controller('premios')
export class PremiosController {
  constructor(private readonly premiosService: PremiosService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() createPremiosDto: CreatePremiosDto): Promise<Premios> {
    return this.premiosService.create(createPremiosDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Premios[]> {
    return this.premiosService.findAll();
  }

  @Get(':id')
  async findOne(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Premios> {
    const premios = await this.premiosService.findOne(id);
    if (premios) {
      res.status(HttpStatus.OK).json(premios);
      return premios;
    }
    res.status(HttpStatus.NOT_FOUND).json({ error: 'premio no existente' });
  }

  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePremiosDto: UpdatePremiosDto,
  ): Promise<Premios> {
    const premios = await this.premiosService.update(id, updatePremiosDto);
    if (premios) {
      res.status(HttpStatus.OK).json({
        message: 'Formulario enviado correctamente',
        updatePremiosDto,
    });
      return premios;
    }
    res.status(HttpStatus.NOT_FOUND).json({ error: 'premio no existente' });
  }

  @Patch('/canje/:id')
  async updateCanje(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePremiosDto: UpdatePremiosDto,
  ): Promise<Premios> {
    const premios = await this.premiosService.updateCanje(id, updatePremiosDto);
    if (premios) {
      res.status(HttpStatus.OK).json({
        message: 'Formulario enviado correctamente',
        updatePremiosDto,
    });
      return premios;
    }
    res.status(HttpStatus.NOT_FOUND).json({ error: 'premio no existente' });
  }
  //@UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const premios = await this.premiosService.remove(id);
    if (premios) {
      res.status(HttpStatus.FOUND).json(premios);
    }
    res.status(HttpStatus.NOT_FOUND).json({ error: 'premio no existente' });
  }

  
}
