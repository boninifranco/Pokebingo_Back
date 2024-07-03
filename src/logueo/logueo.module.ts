import { Module } from '@nestjs/common';
import { LogueoService } from './logueo.service';
import { LogueoController } from './logueo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logueo } from './entities/logueo.entity';
import { Registro } from 'src/registro/entities/registro.entity';
import { RegistroModule } from 'src/registro/registro.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Logueo,Registro]),
    RegistroModule
  ],
  controllers: [LogueoController],
  providers: [LogueoService],
})
export class LogueoModule {}
