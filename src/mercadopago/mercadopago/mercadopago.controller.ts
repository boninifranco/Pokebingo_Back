import { Controller, Post, Body, Res, HttpException, HttpStatus } from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';

@Controller('mercadopago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Post('/create_preference')
  async createPreference(@Body() body: any): Promise<any> {
    try {
      const preferenceId = await this.mercadoPagoService.createPreference(body);
      return { id: preferenceId };
    } catch (error) {
      return { error: 'Error al crear la preferencia' };
    }
  }
}
