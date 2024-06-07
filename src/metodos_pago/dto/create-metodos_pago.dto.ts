import { IsString } from "class-validator";

export class CreateMetodosPagoDto {

    @IsString()
    descripcion: string;
}
