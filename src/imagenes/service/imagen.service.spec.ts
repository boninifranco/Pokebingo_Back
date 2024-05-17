import { Test, TestingModule } from '@nestjs/testing';
import { ImagenService } from './imagen.service';
import fetch, { Response } from 'node-fetch';

// Mock de fetch para simular las peticiones HTTP
jest.mock('node-fetch');
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('ImagenService', () => {
  let service: ImagenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImagenService],
    }).compile();

    service = module.get<ImagenService>(ImagenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch all images', async () => {
    const images = [{ id: 1, url: 'http://localhost:3030/imagenes', descripcion: 'Example Image' }];
    const mockResponse = new Response(JSON.stringify(images), { status: 200 });
    mockFetch.mockResolvedValueOnce(mockResponse);

    const result = await service.getAllImagenes();
    expect(result).toEqual(images);
  });

  it('should fetch image by id', async () => {
    const image = { id: 1, url: 'http://localhost:3030/imagenes', descripcion: 'Example Image' };
    const mockResponse = new Response(JSON.stringify(image), { status: 200 });
    mockFetch.mockResolvedValueOnce(mockResponse);

    const result = await service.getImagenById('1');
    expect(result).toEqual(image);
  });

});
