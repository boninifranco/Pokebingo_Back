import { IsInt, IsNumber, IsString } from 'class-validator';

export class CreateImagenDto {
  @IsNumber()
  id: number;
  @IsString()
  nombre: string;
  @IsString()
  url: string;

}
