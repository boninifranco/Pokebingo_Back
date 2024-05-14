import { Test, TestingModule } from '@nestjs/testing';
import { CartonController } from './carton.controller';
import { CartonService } from '../servicies/carton.service';

describe('CartonController', () => {
  let controller: CartonController;
  let service: CartonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartonController],
      providers: [CartonService],
    }).compile();

    controller = module.get<CartonController>(CartonController);
    service = module.get<CartonService>(CartonService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all cartons', async () => {
    const cartons = [{ /* datos de ejemplo del cartón */ }];
    jest.spyOn(service, 'getAllCartons').mockResolvedValue(cartons);

    expect(await controller.getAllCartons()).toBe(cartons);
  });

  it('should create a new carton', async () => {
    const cartonDto = { /* datos del DTO para crear un nuevo cartón */ };
    const createdCarton = { /* datos de ejemplo del cartón creado */ };
    jest.spyOn(service, 'createCarton').mockResolvedValue(createdCarton);

    expect(await controller.createCarton(cartonDto)).toBe(createdCarton);
  });
});
