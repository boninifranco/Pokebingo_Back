import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  providers: [MailService],
  exports: [MailService], // Exporta para usarlo en otros módulos
})
export class MailModule {}

