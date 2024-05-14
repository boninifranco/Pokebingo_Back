import { Test, TestingModule } from '@nestjs/testing';
import { StockPremiosController } from './stockpremios.controller';
import { StockPremiosService } from './stockpremios.service';

describe('StockPremiosController', () => {
  let controller: StockPremiosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockPremiosController],
      providers: [StockPremiosService],
    }).compile();

    controller = module.get<StockPremiosController>(StockPremiosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
