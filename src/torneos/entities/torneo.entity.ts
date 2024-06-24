import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('torneos')
export class Torneo {
  @PrimaryGeneratedColumn('increment')
  torneoId: number;
  @Column()
  nroTorneo: number;
  @Column()
  fecha: string;
  @Column()
  horaInicio: string;
  @Column()
  horaCierre: string;

  constructor(nroTorneo: number, fecha: string, horaInicio: string, horaCierre: string,) {
    this.nroTorneo = nroTorneo;
    this.fecha = fecha;
    this.horaInicio = horaInicio;
    this.horaCierre = horaCierre;
  }
  public getNroTorneo(): number {return this.nroTorneo}
  public setNroTorneo(nroTorneo: number): void {this.nroTorneo = nroTorneo}
  public getFecha(): string {return this.fecha}
  public setFecha(fecha: string): void {this.fecha = fecha}
  public getHoraInicio(): string {return this.horaInicio}
  public setHoraInicio(horaInicio: string): void {this.horaInicio = horaInicio}
  public getHoraCierre(): string {return this.horaCierre}
  public setHoraCierre(horaCierre: string): void {this.horaCierre = horaCierre}
}
