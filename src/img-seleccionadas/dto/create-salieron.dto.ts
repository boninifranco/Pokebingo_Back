import { Salieron } from './../entities/salieron.entity';
import { IsNumber, IsString } from "class-validator";


export class CreateSalieronDto {

    @IsNumber()
    id: number
    
    @IsString()
    nombre: string

    @IsString()
    url: string

    @IsNumber()
    imagenId: number
}
