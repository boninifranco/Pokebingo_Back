import { Sala } from "src/sala/entities/sala.entity";
import { Column, ColumnTypeUndefinedError, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('partidas')
export class Partida {
    @PrimaryGeneratedColumn()
    partidaId: number;
    @Column()
    nroPartida: number;
    @Column()
    horaInicio: string;
    @Column()
    cantidadCartones: number;
    @Column()
    estadoPartida: boolean;

    @OneToOne(()=> Sala, (sala) => sala.partida)
    sala: Sala;
}
