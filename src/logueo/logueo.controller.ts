import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LogueoService } from './logueo.service';
import { CreateLogueoDto } from './dto/create-logueo.dto';
import { UpdateLogueoDto } from './dto/update-logueo.dto';

@Controller('logueo')
export class LogueoController {
  constructor(private readonly logueoService: LogueoService) {}

  @Post()
  create(@Body() createLogueoDto: CreateLogueoDto) {
    return this.logueoService.create(createLogueoDto);
  }

  @Get()
  findAll() {
    return this.logueoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logueoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogueoDto: UpdateLogueoDto) {
    return this.logueoService.update(+id, updateLogueoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logueoService.remove(+id);
  }
}
