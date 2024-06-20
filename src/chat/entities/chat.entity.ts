import { Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
@Entity('chat')
export class Chat {
    @PrimaryGeneratedColumn('increment')
    chatId: number;
    @Column()
    mensaje: string;

    constructor(mensaje: string){
        this.mensaje = mensaje;
    }
    public getMensaje(): string {return this.mensaje};
    public setMensaje(mensaje: string): void {this.mensaje = mensaje};
}
