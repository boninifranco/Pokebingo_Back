import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { MetodosPagoService } from './metodospago.service';
import { CreateMetodosPagoDto } from './dto/create-metodos_pago.dto';
import { UpdateMetodosPagoDto } from './dto/update-metodos_pago.dto';
import { MetodosPago } from './entities/metodospago.entity';
import { Response } from 'express';

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
  async findOne(@Res() res: Response, @Param('id') id: number): Promise<MetodosPago | null> {
    const metodoPago = await this.metodosPagoService.findOne(id)
    if (metodoPago){
      res.status(HttpStatus.FOUND).json(metodoPago);
      return;
    }
    res.status(HttpStatus.NOT_FOUND).json({ error: 'Metodo no existe'})
  }

  @Patch(':id')
  async update(@Res() res: Response, @Param('id') id: number, @Body() updateMetodosPagoDto: UpdateMetodosPagoDto): Promise<MetodosPago | null> {
    const metodoPago = await this.metodosPagoService.update(id, updateMetodosPagoDto)
    if (metodoPago){
      res.status(HttpStatus.FOUND).json(metodoPago);
      return;
    }
    res.status(HttpStatus.NOT_FOUND).json({ error: "Método no existe"});
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: number): Promise<MetodosPago | null> {
    const metodoPago = await this.metodosPagoService.remove(id)
    if (metodoPago){
      res.status(HttpStatus.FOUND).json(metodoPago);
      return;
    }
    res.status(HttpStatus.NOT_FOUND).json({ error: "Método no existe"});
  }
}
