import { Module } from '@nestjs/common';
import { LogueoService } from './logueo.service';
import { LogueoController } from './logueo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logueo } from './entities/logueo.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Logueo
    ])
  ],
  controllers: [LogueoController],
  providers: [LogueoService],
})
export class LogueoModule {}
