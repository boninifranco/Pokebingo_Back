import { IsInt, IsNumber, IsString } from 'class-validator';

export class CreatePremiosDto {
  @IsString()
  descripcion: string;

  @IsInt()
  creditos: number;
  
  @IsString()
  imagen: string;

  @IsInt()
  stock: number;
}
