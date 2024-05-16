import { Module } from '@nestjs/common';
import { CasilleroController } from 'src/casilleros/controllers/casillero.controllers';
import { CasilleroService } from 'src/casilleros/service/casillero.service';

@Module({
  controllers: [CasilleroController],
  providers: [CasilleroService],
})
export class CasilleroModule {}
