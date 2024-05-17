import { Module } from '@nestjs/common';
import { ImagenController } from '../imagenes/controllers/imagen.controller';
import { ImagenService } from '../imagenes/service/imagen.service';

@Module({
  controllers: [ImagenController],
  providers: [ImagenService],
})
export class ImagenModule {}
