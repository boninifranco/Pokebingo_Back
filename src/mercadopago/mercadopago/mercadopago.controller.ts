import { Controller, Post, Body, Res, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';
import { CartonService } from 'src/cartones/servicies/carton.service';

@Controller('mercadopago')
export class MercadoPagoController {
  constructor(
    private readonly mercadoPagoService: MercadoPagoService,
    private readonly cartonService: CartonService,
  ) {}

  @Post('/create_preference')
  async createPreference(@Body() body: any): Promise<any> {
    try {
      const preferenceId = await this.mercadoPagoService.createPreference(body);
      return { id: preferenceId };
    } catch (error) {
      return { error: 'Error al crear la preferencia' };
    }
  }

  @Get('/validate_payment')
  async validatePayment(@Query() query: any, @Res() res): Promise<any> {
    try {
      const { payment_id, status, external_reference } = query;

      if (status !== 'approved') {
        return res.status(400).json({ message: 'Pago no aprobado.' });
      }

      const [cartonIds, usuarioId] = external_reference.split('-');
      const cartones = cartonIds.split(',').map(Number);

      for (const cartonId of cartones) {
        await this.cartonService.asignarUsuario(cartonId, Number(usuarioId));
      }

      return res.redirect('http://localhost:3001/SalaJuegoUser');
    } catch (error) {
      console.error('Error en validatePayment:', error.message);
      return res.status(500).json({ message: 'Error al validar el pago.' });
    }
  }
}
