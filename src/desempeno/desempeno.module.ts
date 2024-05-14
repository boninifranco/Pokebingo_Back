import { Module } from '@nestjs/common';
import { DesempenoService } from './desempeno.service';
import { DesempenoController } from './desempeno.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({  
  controllers: [DesempenoController],
  providers: [DesempenoService],
  imports:[UsuarioModule]
})
export class DesempenoModule {}
