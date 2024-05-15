import { Test, TestingModule } from '@nestjs/testing';
import { FilaController } from '../controllers/fila.controller';
import { FilaService } from '../service/fila.service';

describe('FilaController', () => {
  let controller: FilaController;
  let service: FilaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilaController],
      providers: [FilaService],
    }).compile();

    controller = module.get<FilaController>(FilaController);
    service = module.get<FilaService>(FilaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllFilas', () => {
    it('should return all filas', async () => {
      const expectedResult = ['fila1', 'fila2']; // Define el resultado esperado
      jest.spyOn(service, 'getAllFilas').mockResolvedValue(expectedResult);

      const result = await controller.getAllFilas();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getFilaById', () => {
    it('should return a fila by ID', async () => {
      const expectedResult = 'fila1'; // Define el resultado esperado
      const filaId = '1'; // Define el ID de la fila
      jest.spyOn(service, 'getFilaById').mockResolvedValue(expectedResult);

      const result = await controller.getFilaById(filaId);
      expect(result).toEqual(expectedResult);
    });
  });
});