import { Module } from '@nestjs/common';
import { PuntajesService } from './puntajes.service';
import { PuntajesController } from './puntajes.controller';

@Module({
  controllers: [PuntajesController],
  providers: [PuntajesService],
})
export class PuntajesModule {}
