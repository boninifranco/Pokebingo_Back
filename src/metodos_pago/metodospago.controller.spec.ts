import { Test, TestingModule } from '@nestjs/testing';
import { MetodosPagoController } from './metodospago.controller';
import { MetodosPagoService } from './metodospago.service';

describe('MetodosPagoController', () => {
  let controller: MetodosPagoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetodosPagoController],
      providers: [MetodosPagoService],
    }).compile();

    controller = module.get<MetodosPagoController>(MetodosPagoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
