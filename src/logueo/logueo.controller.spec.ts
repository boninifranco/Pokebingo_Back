import { Test, TestingModule } from '@nestjs/testing';
import { LogueoController } from './logueo.controller';
import { LogueoService } from './logueo.service';

describe('LogueoController', () => {
  let controller: LogueoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogueoController],
      providers: [LogueoService],
    }).compile();

    controller = module.get<LogueoController>(LogueoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
