import { Module } from '@nestjs/common';
import { LogueoService } from './logueo.service';
import { LogueoController } from './logueo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logueo } from './entities/logueo.entity';
import { Registro } from 'src/registro/entities/registro.entity';
import { RegistroModule } from 'src/registro/registro.module';
import { Carton } from 'src/cartones/entities/carton.entity';
import { CreateLogueoDto } from './dto/create-logueo.dto';

@Module({
  imports: [TypeOrmModule.forFeature([Logueo, Registro, Carton]), RegistroModule],
  controllers: [LogueoController],
  providers: [LogueoService, CreateLogueoDto],
  exports: [LogueoService]
})
export class LogueoModule {}
