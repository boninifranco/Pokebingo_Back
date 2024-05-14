import { Module } from '@nestjs/common';
import { LogueoService } from './logueo.service';
import { LogueoController } from './logueo.controller';

@Module({
  controllers: [LogueoController],
  providers: [LogueoService],
})
export class LogueoModule {}
