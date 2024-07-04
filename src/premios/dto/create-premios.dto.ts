import { IsInt, IsString } from 'class-validator';

export class CreatePremiosDto {
  @IsString()
  descripcion: string;

  @IsInt()
  creditos: number;
}
