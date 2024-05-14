import { Test, TestingModule } from '@nestjs/testing';
import { PuntajesService } from './puntajes.service';

describe('PuntajesService', () => {
  let service: PuntajesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PuntajesService],
    }).compile();

    service = module.get<PuntajesService>(PuntajesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});