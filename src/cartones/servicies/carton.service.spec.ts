import { Test, TestingModule } from '@nestjs/testing';
import { CartonModule } from '../../cartones/carton.module';

describe('CartonModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [CartonModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
