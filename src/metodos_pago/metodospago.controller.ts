import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res, ParseIntPipe, UseGuards } from '@nestjs/common';
import { MetodosPagoService } from './metodospago.service';
import { CreateMetodosPagoDto } from './dto/create-metodos_pago.dto';
import { UpdateMetodosPagoDto } from './dto/update-metodos_pago.dto';
import { MetodosPago } from './entities/metodospago.entity';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth/auth.guard';

@Controller('metodospago')
export class MetodosPagoController {
  constructor(private readonly metodosPagoService: MetodosPagoService) {}

  @Post()
  @HttpCode(HttpStatus.FOUND)
  async create(@Body() createMetodosPagoDto: CreateMetodosPagoDto): Promise<MetodosPago> {
    return this.metodosPagoService.create(createMetodosPagoDto);
  }

  @Get()
  @HttpCode(HttpStatus.FOUND)
  async findAll():Promise<MetodosPago[]> {
    return this.metodosPagoService.findAll();
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id', ParseIntPipe) id: number): Promise<MetodosPago> {
    const metodoPago = await this.metodosPagoService.findOne(id)
    if (metodoPago){
      res.status(HttpStatus.FOUND).json(metodoPago);
      return metodoPago;
    }
    res.status(HttpStatus.NOT_FOUND).json({ error: 'Metodo no existe'})
  }

  @Patch(':id')
  async update(@Res() res: Response, @Param('id', ParseIntPipe) id: number, @Body() updateMetodosPagoDto: UpdateMetodosPagoDto): Promise<MetodosPago> {
    const metodoPago = await this.metodosPagoService.update(id, updateMetodosPagoDto)
    if (metodoPago){
      res.status(HttpStatus.FOUND).json(metodoPago);
      return metodoPago;
    }
    res.status(HttpStatus.NOT_FOUND).json({ error: "Método no existe"});
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const metodoPago = await this.metodosPagoService.remove(id)
    if (metodoPago){
      res.status(HttpStatus.FOUND).json(metodoPago);      
    }
    res.status(HttpStatus.NOT_FOUND).json({ error: "Método no existe"});
  }
}
