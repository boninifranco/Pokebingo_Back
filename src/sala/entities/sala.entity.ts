import { Chat } from "src/chat/entities/chat.entity";
import { Partida } from "src/partidas/entities/partida.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('sala')
export class Sala {
    @PrimaryGeneratedColumn('increment')
    salaId: number;

    @OneToOne(()=> Chat)
    @JoinColumn()
    chat: Chat;

    @OneToOne(()=> Partida)
    @JoinColumn()
    partida: Partida;
}
