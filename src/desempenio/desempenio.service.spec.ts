import { Test, TestingModule } from '@nestjs/testing';
import { DesempenioService } from './desempenio.service';

describe('DesempenioService', () => {
  let service: DesempenioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DesempenioService],
    }).compile();

    service = module.get<DesempenioService>(DesempenioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
