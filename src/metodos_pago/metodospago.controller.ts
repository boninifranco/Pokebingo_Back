import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MetodosPagoService } from './metodospago.service';
import { CreateMetodosPagoDto } from './dto/create-metodos_pago.dto';
import { UpdateMetodosPagoDto } from './dto/update-metodos_pago.dto';

@Controller('metodosdepago')
export class MetodosPagoController {
  constructor(private readonly MetodosPagoService: MetodosPagoService) {}

  @Post()
  create(@Body() CreateMetodosPagoDto: CreateMetodosPagoDto) {
    return this.MetodosPagoService.create(CreateMetodosPagoDto);
  }

  @Get()
  findAll() {
    return this.MetodosPagoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.MetodosPagoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMetodosPagoDto: UpdateMetodosPagoDto) {
    return this.MetodosPagoService.update(+id, updateMetodosPagoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.MetodosPagoService.remove(+id);
  }
}
