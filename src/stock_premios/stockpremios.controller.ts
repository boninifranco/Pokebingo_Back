import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { StockPremiosService } from './stockpremios.service';
import { CreateStockPremiosDto } from './dto/create-stockpremios.dto';
import { UpdateStockPremiosDto } from './dto/update-stockpremios.dto';
import { Response } from 'express';

@Controller('stockpremios')
export class StockPremiosController {
  constructor(private readonly stockPremiosService: StockPremiosService) {}

  @Post()
  @HttpCode(HttpStatus.FOUND)
  create(@Body() createStockPremiosDto: CreateStockPremiosDto) {
    return this.stockPremiosService.create(createStockPremiosDto);
  }

  @Get()
  @HttpCode(HttpStatus.FOUND)
  findAll() {
    return this.stockPremiosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    const isStockPremio = await this.stockPremiosService.findOne(id);
    if(isStockPremio){
      res.status(HttpStatus.FOUND).json(isStockPremio);
      return;
    }
    res.status(HttpStatus.NOT_FOUND).json({message: `No existe StockPremio con id ${id}`})

    return this.stockPremiosService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateStockPremiosDto: UpdateStockPremiosDto, @Res() res: Response) {
    const isStockPremio = await this.stockPremiosService.update(id, updateStockPremiosDto);
    if(isStockPremio){
      res.status(HttpStatus.FOUND).json(isStockPremio);
      return;
    }
    res.status(HttpStatus.NOT_FOUND).json({message: `No existe StockPremio con id ${id}`})

    return this.stockPremiosService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res: Response):Promise<any> {
    const isStockPremio = await this.stockPremiosService.remove(id);
    if(isStockPremio){
      res.status(HttpStatus.FOUND).json(isStockPremio);
      return;
    }
    res.status(HttpStatus.NOT_FOUND).json({message: `No existe StockPremio con id ${id}`})

    return this.stockPremiosService.findOne(+id);
  }
}
