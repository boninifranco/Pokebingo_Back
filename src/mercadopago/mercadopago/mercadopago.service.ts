import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const mpago_token = 'TEST-5420467070823491-110720-342b923d5822bb3eefbe554bd75c2a10-154820115';

@Injectable()
export class MercadoPagoService {
  private client: MercadoPagoConfig;

  constructor() {
    this.client = new MercadoPagoConfig({ accessToken: mpago_token });
  }

  async createPreference(data: any): Promise<string> {
    try {
      const preference = new Preference(this.client);

      const body = {
        items: [
          {
            id: '1',
            title: data.title,
            description: 'Cartón Pokebingo',
            quantity: Number(data.quantity),
            unit_price: Number(data.unit_price),
            currency_id: 'ARS',
          },
        ],
        back_urls: {
          success: 'http://localhost:3000/mercadopago/validate_payment',
          failure: 'http://localhost:3001/SalaJuegoUser',
          pending: 'http://localhost:3000/mercadopago/validate_payment',
        },
        auto_return: 'approved',
        external_reference: `${data.cartones.join(',')}-${data.usuarioId}`,
      };

      const result = await preference.create({ body });
      console.log('Preferencia creada:', result);
      return result.id;
    } catch (error) {
      console.error('Error al crear la preferencia:', error);
      throw new Error('Error al crear la preferencia de pago');
    }
  }
}
