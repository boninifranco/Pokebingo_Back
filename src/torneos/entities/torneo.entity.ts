import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('torneos')
export class Torneo {
    @PrimaryColumn()
    id: number;

    @Column()
    nroTorneo: number;
    fecha: Date;
    horaInicio: TimeRanges;
    horaCierre: TimeRanges;
    
}
