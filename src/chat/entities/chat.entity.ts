import { Column, Entity, PrimaryColumn } from "typeorm";
@Entity('chats')
export class Chat {
    @PrimaryColumn()
        id: number;
    @Column()
    idUsuario: number;
    mensaje: string;

}
