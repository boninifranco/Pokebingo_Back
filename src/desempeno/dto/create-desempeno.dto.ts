import { IsInt, IsOptional, Min } from "class-validator";
import { Usuario } from "src/usuario/entities/usuario.entity";

export class CreateDesempenoDto {

    @IsInt()
    //@Min(1)
    jugador:Usuario;

    @IsInt()    
    puntos:number;

    @IsInt()    
    creditos:number;

    @IsInt()
    cartonesComprados?:number
}
