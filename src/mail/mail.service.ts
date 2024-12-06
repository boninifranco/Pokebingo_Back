import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    // Configura el transporte de nodemailer
    this.transporter = nodemailer.createTransport({
      //service: 'gmail', // Cambia esto según tu proveedor de correo
      service: 'SendGrid',
      auth: {
        //user: 'wibauxjuampi@gmail.com', // Tu correo electrónico
        user: 'apikey',
        //pass: 'juampi1973@',       // Tu contraseña o clave de aplicación
        pass:'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',
      },
    });
  }

  async enviarCorreo(destinatario: string, asunto: string, mensaje: string) {
    try {
      const mailOptions = {
        from: 'wibauxjuampi@gmail.com', // Dirección del remitente
        to: destinatario,            // Dirección del destinatario
        subject: asunto,
        text: mensaje,               // Mensaje en texto plano
      };

      await this.transporter.sendMail(mailOptions);
      return { success: true, message: 'Correo enviado exitosamente' };
    } catch (error) {
      console.error('Error al enviar correo:', error);
      throw error;
    }
  }
}
