import { IsInt, IsString } from "class-validator";

export class CreateImagenDto {
  @IsInt()
    imagenId: number;

  @IsString()
    imagen: string;
  }
  