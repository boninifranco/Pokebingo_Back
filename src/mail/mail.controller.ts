import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('correo')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('enviar')
  async enviarCorreo(
    @Body() { destinatario, asunto, mensaje }: { destinatario: string; asunto: string; mensaje: string },
  ) {
    return this.mailService.enviarCorreo(destinatario, asunto, mensaje);
  }
}
