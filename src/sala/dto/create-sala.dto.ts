import { IsInt, IsString } from "class-validator";

export class CreateSalaDto {
    @IsInt()
    salaid: number;

    @IsInt()
    usuarioid: number;

    @IsInt()
    partidaid: number;

    @IsInt()
    chatid: number;
}
