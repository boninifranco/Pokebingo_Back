import { Test, TestingModule } from '@nestjs/testing';
import { DesempenoService } from './desempeno.service';

describe('DesempenoService', () => {
  let service: DesempenoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DesempenoService],
    }).compile();

    service = module.get<DesempenoService>(DesempenoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
