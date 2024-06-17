import { Sala } from "src/sala/entities/sala.entity";
import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
@Entity('chat')
export class Chat {
    @PrimaryColumn()
    chatId: number;
    @Column()
    mensaje: string;

    // @OneToOne(()=> Sala, (sala) => sala.chat)
    // sala: Sala;
}
