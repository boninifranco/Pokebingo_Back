import { IsBoolean, IsDate, IsInt, IsOptional, IsString, Min } from "class-validator";


export class CreateLogueoDto {

    @IsInt()       
    idUsuario:number;

    //@IsBoolean()
    //logueado:boolean;

    //@IsDate()
    //@IsOptional()
    //login: Date;

    @IsString()
    @IsOptional()
    logout: string;
    

}
