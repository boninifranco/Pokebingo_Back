import { Test, TestingModule } from '@nestjs/testing';
import { StockPremiosService } from './stockpremios.service';

describe('StockPremiosService', () => {
  let service: StockPremiosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockPremiosService],
    }).compile();

    service = module.get<StockPremiosService>(StockPremiosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
