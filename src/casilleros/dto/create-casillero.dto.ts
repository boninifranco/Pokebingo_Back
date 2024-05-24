import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCasilleroDto {
  @IsNotEmpty()
  @IsString()
  readonly filaId: string; // ID de la fila a la que pertenece el casillero

  @IsNotEmpty()
  @IsNumber()
  readonly numero: number; // Número del casillero

  @IsNotEmpty()
  @IsString()
  readonly contenido: string; // Contenido del casillero (por ejemplo, texto, imagen, etc.)
}