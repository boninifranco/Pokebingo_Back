import { IsInt, IsString } from "class-validator";

export class CreateChatDto {

    @IsInt()
    idUsuario: number;

    @IsString()
    mensaje: string;
}
