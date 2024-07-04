import { Carton } from "src/cartones/entities/carton.entity";
import { Sala } from "src/sala/entities/sala.entity";
import { Column, ColumnTypeUndefinedError, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('partidas')
export class Partida {
    @PrimaryGeneratedColumn('increment')
    partidaId: number;
    @Column()
    horaInicio: string;
    @Column()
    cantidadCartones: number;
    @Column()
    estadoPartida: boolean;

    @OneToOne(() => Sala, sala => sala.partida,{onDelete: 'CASCADE',})
    @JoinColumn({ name: 'salaId' })
    public sala: Sala;
    
    @OneToMany(()=> Carton, (carton) => carton.partida)
    cartones: Carton[];

    constructor(horaInicio: string, cantidadCartones: number, estadoPartida: boolean){
        this.horaInicio = horaInicio;
        this.cantidadCartones = cantidadCartones;
        this. estadoPartida = estadoPartida;
    }

    public getHoraInicio(): string {return this.horaInicio};
    public setHoraInicio(horaInicio: string): void {this.horaInicio = horaInicio};
    public getCantidadCartones(): number {return this.cantidadCartones};
    public setCantidadCartones(cantidadCartones: number): void {this.cantidadCartones = cantidadCartones};
    public getEstadoPartida(): boolean {return this.estadoPartida};
    public setEstadoPartida(estadoPartida: boolean): void {this.estadoPartida = estadoPartida};
}
