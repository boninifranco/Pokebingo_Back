import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, ParseIntPipe, UseGuards} from '@nestjs/common';
import { ImagenService } from '../service/imagen.service';
import { CreateImagenDto } from '../dto/create-imagen.dto';
import { UpdateImagenDto } from '../dto/update-imagen.dto';
import { Imagen } from '../entities/imagen.entity';
import { AuthGuard } from 'src/auth/auth/auth.guard';
import { CreateImgPremiosDto } from '../dto/create-imgPremios.dto';
import { ImgPremios } from '../entities/imgPremios.entity';

@Controller('imagenes')
export class ImagenController {
  constructor(private readonly imagenService: ImagenService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Imagen[]> {
    return this.imagenService.findAll();
  }
  @Get('/premios')
  @HttpCode(HttpStatus.OK)
  findAllImgPremios(): Promise<ImgPremios[]> {
    return this.imagenService.findAllImgPremios();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string): Promise<Imagen> {
    const imagen = await this.imagenService.findOne(id);
    return imagen;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createImagenDto: CreateImagenDto): Promise<Imagen> {
    return this.imagenService.create(createImagenDto);
  }

  @Post('/premios')
  @HttpCode(HttpStatus.CREATED)
  createImgPremios(@Body() createImgPremiosDto: CreateImgPremiosDto): Promise<ImgPremios> {
    return this.imagenService.createImgPremios(createImgPremiosDto);
  }
  

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateImagenDto: UpdateImagenDto,
  ): Promise<Imagen> {
    const updatedImagen = await this.imagenService.update(id, updateImagenDto);
    return updatedImagen;
  }

  //@UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string) {
    const deleteImagen = this.imagenService.remove(id);
    return deleteImagen;
  }
}
