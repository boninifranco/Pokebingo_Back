import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus, Res} from '@nestjs/common';
import { DesempenoService } from './desempeno.service';
import { CreateDesempenoDto } from './dto/create-desempeno.dto';
import { UpdateDesempenoDto } from './dto/update-desempeno.dto';
import { Response } from 'express';
import { Desempeno } from './entities/desempeno.entity';

@Controller('desempeno')
export class DesempenoController {
  constructor(private readonly desempenoService: DesempenoService) {}

  @Post()
  @HttpCode(HttpStatus.FOUND)
  create(@Body() createDesempenoDto: CreateDesempenoDto) {
    return this.desempenoService.create(createDesempenoDto);
  }

  @Get()
  @HttpCode(HttpStatus.FOUND)
  findAll() {
    return this.desempenoService.findAll();
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id', ParseIntPipe) id: number):Promise<Desempeno|null> {
    const isDesempeno = await this.desempenoService.findOne(id);
    if(isDesempeno){
      res.status(HttpStatus.FOUND).json(isDesempeno)
    }
    res.status(HttpStatus.NOT_FOUND).json({message: `El desempeno con id ${id} no se encontro`})
    return 
  }

  @Patch(':id')
  async update(@Res() res: Response, @Param('id',ParseIntPipe) id: number, @Body() updateDesempenoDto: UpdateDesempenoDto): Promise<Desempeno|null> {
    const isDesempeno = await this.desempenoService.update(id, updateDesempenoDto);
    if (isDesempeno){
      res.status(HttpStatus.FOUND).json(isDesempeno)
      return isDesempeno;
    }
    res.status(HttpStatus.NOT_FOUND).json({message:`El desempeno con id ${id} no se encontró`}) ;
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number):Promise<any> {
    const isDesempeno = await this.desempenoService.remove(id);
    if(isDesempeno){
      res.status(HttpStatus.FOUND).json(isDesempeno);
      return isDesempeno;
    }
    res.status(HttpStatus.NOT_FOUND).json({message:`El desempeno con id ${id} no se encontro`}) 
  }
}
