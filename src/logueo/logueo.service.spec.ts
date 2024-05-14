import { Test, TestingModule } from '@nestjs/testing';
import { LogueoService } from './logueo.service';

describe('LogueoService', () => {
  let service: LogueoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogueoService],
    }).compile();

    service = module.get<LogueoService>(LogueoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
