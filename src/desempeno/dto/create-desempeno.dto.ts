import { IsInt, IsOptional, Min } from "class-validator";

export class CreateDesempenoDto {

    @IsInt()
    @Min(1)
    jugador:number;

    @IsInt()    
    puntos:number;

    @IsInt()    
    creditos:number;

    @IsInt()
    cartonesComprados?:number
}
