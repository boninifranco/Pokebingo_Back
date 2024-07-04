import { IsInt, IsString } from 'class-validator';

export class CreateImagenDto {
  @IsString()
  imagen: string;

}
