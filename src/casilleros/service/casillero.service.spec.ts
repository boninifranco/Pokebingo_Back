import { Test, TestingModule } from '@nestjs/testing';
import { CasilleroService } from './casillero.service';

describe('CasilleroService', () => {
  let service: CasilleroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CasilleroService],
    }).compile();

    service = module.get<CasilleroService>(CasilleroService);
  });
  
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all casilleros', async () => {
    // Simula llamada al método getAllCasilleros del servicio
    const result = await service.getAllCasilleros();
  
    // Verifica que el resultado no sea undefined
    expect(result).toBeDefined();
  
    // Verifica que el resultado sea del tipo esperado (en este caso, un array)
    expect(Array.isArray(result)).toBe(true);
  
  });
  
});

