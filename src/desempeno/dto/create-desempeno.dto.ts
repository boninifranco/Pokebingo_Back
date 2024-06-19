import { IsInt, IsOptional, Min } from "class-validator";
import { Registro } from "src/registro/entities/registro.entity";

export class CreateDesempenioDto {

    @IsInt()    
    jugador:Registro;

    @IsInt()    
    puntos:number;

    @IsInt()    
    creditos:number;

    @IsInt()
    cartonesComprados?:number
}
