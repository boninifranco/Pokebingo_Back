export class CreateCasilleroDto {
  readonly filaId: string; // ID de la fila a la que pertenece el casillero
  readonly numero: number; // Número del casillero
  readonly contenido: string; // Contenido del casillero (por ejemplo, texto, imagen, etc.)
}