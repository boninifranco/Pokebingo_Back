import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockPremiosService } from './stockpremios.service';
import { CreateStockPremiosDto } from './dto/create-stockpremios.dto';
import { UpdateStockPremiosDto } from './dto/update-stockpremios.dto';

@Controller('stockpremios')
export class StockPremiosController {
  constructor(private readonly stockPremiosService: StockPremiosService) {}

  @Post()
  create(@Body() createStockPremiosDto: CreateStockPremiosDto) {
    return this.stockPremiosService.create(createStockPremiosDto);
  }

  @Get()
  findAll() {
    return this.stockPremiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockPremiosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockPremiosDto: UpdateStockPremiosDto) {
    return this.stockPremiosService.update(+id, updateStockPremiosDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockPremiosService.remove(+id);
  }
}
