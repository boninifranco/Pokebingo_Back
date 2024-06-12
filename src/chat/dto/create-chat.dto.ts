import { IsInt, IsString } from "class-validator";

export class CreateChatDto {
    @IsInt()
    chatId: number;

    @IsInt()
    idUsuario: number;

    @IsString()
    mensaje: string;
}
