import {  Controller,  Get,  Post,  Body,  Patch,  Param,  Delete,  HttpCode,  HttpStatus,
  Res,  ParseIntPipe,  UseGuards,} from '@nestjs/common';
import { StockPremiosService } from './stockpremios.service';
import { CreateStockPremiosDto } from './dto/create-stockpremios.dto';
import { UpdateStockPremiosDto } from './dto/update-stockpremios.dto';
import { Response } from 'express';
import { StockPremios } from './entities/stockpremios.entity';
import { AuthGuard } from 'src/auth/auth/auth.guard';

@Controller('stockPremios')
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
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ): Promise<StockPremios> {
    const isStockPremio = await this.stockPremiosService.findOne(id);
    if (isStockPremio) {
      res.status(HttpStatus.FOUND).json(isStockPremio);
      return isStockPremio;
    }
    res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: `No existe StockPremio con id ${id}` });

    return this.stockPremiosService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStockPremiosDto: UpdateStockPremiosDto,
    @Res() res: Response,
  ): Promise<StockPremios> {
    const isStockPremio = await this.stockPremiosService.update(
      id,
      updateStockPremiosDto,
    );
    if (isStockPremio) {
      res.status(HttpStatus.FOUND).json(isStockPremio);
      return isStockPremio;
    }
    res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: `No existe StockPremio con id ${id}` });

    return this.stockPremiosService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const isStockPremio = await this.stockPremiosService.remove(id);
    if (isStockPremio) {
      res.status(HttpStatus.FOUND).json(isStockPremio);
      return isStockPremio;
    }
    res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: `No existe StockPremio con id ${id}` });

    return this.stockPremiosService.findOne(+id);
  }
}
