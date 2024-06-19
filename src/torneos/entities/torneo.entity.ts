import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('torneos')
export class Torneo {
  @PrimaryGeneratedColumn('increment')
  torneoId: number;
  @Column()
  nroTorneo: number;
  @Column()
  fecha: Date;
  @Column()
  horaInicio: Date;
  @Column()
  horaCierre: Date;

  constructor(nroTorneo: number, fecha: Date, horaInicio: Date, horaCierre: Date,) {
    this.nroTorneo = nroTorneo;
    this.fecha = fecha;
    this.horaInicio = horaInicio;
    this.horaCierre = horaCierre;
  }
  public getNroTorneo(): number {return this.nroTorneo}
  public setNroTorneo(nroTorneo: number): void {this.nroTorneo = nroTorneo}
  public getFecha(): Date {return this.fecha}
  public setFecha(fecha: Date): void {this.fecha = fecha}
  public getHoraInicio(): Date {return this.horaInicio}
  public setHoraInicio(horaInicio: Date): void {this.horaInicio = horaInicio}
  public getHoraCierre(): Date {return this.horaCierre}
  public setHoraCierre(horaCierre: Date): void {this.horaCierre = horaCierre}
}
