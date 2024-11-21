import { Module } from '@nestjs/common';
import { ImagenController } from '../imagenes/controllers/imagen.controller';
import { ImagenService } from '../imagenes/service/imagen.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Imagen } from './entities/imagen.entity';
import { Casillero } from 'src/casilleros/entities/casillero.entity';
import { ImgPremios } from './entities/imgPremios.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Imagen, Casillero, ImgPremios])],
  controllers: [ImagenController],
  providers: [ImagenService],
})
export class ImagenModule {}
