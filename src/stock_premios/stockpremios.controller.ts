import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockPremiosService } from './stockpremios.service';
import { CreateStockPremiosDto } from './dto/create-stockpremios.dto';
import { UpdateStockPremiosDto } from './dto/update-stockpremios.dto';

@Controller('Stock Premios')
export class StockPremiosController {
  constructor(private readonly StockPremiosService: StockPremiosService) {}

  @Post()
  create(@Body() createStockPremiosDto: CreateStockPremiosDto) {
    return this.StockPremiosService.create(createStockPremiosDto);
  }

  @Get()
  findAll() {
    return this.StockPremiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.StockPremiosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateStockPremiosDto: UpdateStockPremiosDto) {
    return this.StockPremiosService.update(+id, updateStockPremiosDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.StockPremiosService.remove(+id);
  }
}
