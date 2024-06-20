import { Carton } from "src/cartones/entities/carton.entity";
import { Sala } from "src/sala/entities/sala.entity";
import { Column, ColumnTypeUndefinedError, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('partidas')
export class Partida {
    @PrimaryGeneratedColumn('increment')
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
    @OneToMany(()=> Carton, (carton) => carton.partida)
    cartones: Carton[];

    constructor(nroPartida: number, horaInicio: string, cantidadCartones: number, estadoPartida: boolean){
        this.nroPartida = nroPartida;
        this.horaInicio = horaInicio;
        this.cantidadCartones = cantidadCartones;
        this. estadoPartida = estadoPartida;
    }

    public getNroPartida(): number {return this.nroPartida};
    public setNroPartida(nroPartida: number): void {this.nroPartida = nroPartida};
    public getHoraInicio(): string {return this.horaInicio};
    public setHoraInicio(horaInicio: string): void {this.horaInicio = horaInicio};
    public getCantidadCartones(): number {return this.cantidadCartones};
    public setCantidadCartones(cantidadCartones: number): void {this.cantidadCartones = cantidadCartones};
    public getEstadoPartida(): boolean {return this.estadoPartida};
    public setEstadoPartida(estadoPartida: boolean): void {this.estadoPartida = estadoPartida};
}
