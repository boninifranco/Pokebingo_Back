import { Module } from '@nestjs/common';
import { ImagenController } from '../imagenes/controllers/imagen.controller';
import { ImagenService } from '../imagenes/service/imagen.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Imagen } from './entities/imagen.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Imagen
    ])
  ],
  controllers: [ImagenController],
  providers: [ImagenService],
})
export class ImagenModule {}
