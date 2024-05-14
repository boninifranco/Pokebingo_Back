import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe} from '@nestjs/common';
import { DesempenoService } from './desempeno.service';
import { CreateDesempenoDto } from './dto/create-desempeno.dto';
import { UpdateDesempenoDto } from './dto/update-desempeno.dto';

@Controller('desempeno')
export class DesempenoController {
  constructor(private readonly desempenoService: DesempenoService) {}

  @Post()
  create(@Body() createDesempenoDto: CreateDesempenoDto) {
    return this.desempenoService.create(createDesempenoDto);
  }

  @Get()
  findAll() {
    return this.desempenoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.desempenoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDesempenoDto: UpdateDesempenoDto) {
    return this.desempenoService.update(+id, updateDesempenoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.desempenoService.remove(+id);
  }
}