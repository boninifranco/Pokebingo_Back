import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateLogueoDto {
  @IsInt()
  idUsuario: number;

  @IsString()
  @IsOptional()
  logout: string;
}
