import { Sala } from "src/sala/entities/sala.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('chat')
export class Chat {
    @PrimaryGeneratedColumn('increment')
    chatId: number;
    
    @Column()
    mensaje: string;

    @ManyToOne(() => Sala, sala => sala.chat, {onDelete: 'CASCADE',})
    @JoinColumn({name: 'salaId'})
    public sala: Sala;

    constructor(mensaje: string, sala?: Sala) {
        this.mensaje = mensaje;
        if (sala) {
            this.sala = sala;
        }
    }

    public getMensaje(): string {
        return this.mensaje;
    }

    public setMensaje(mensaje: string): void {
        this.mensaje = mensaje;
    }
}
