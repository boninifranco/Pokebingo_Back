import { Fila } from 'src/filas/entities/fila.entity';
import { Partida } from 'src/partidas/entities/partida.entity';
import { Registro } from 'src/registro/entities/registro.entity';
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';

@Entity('cartones')
export class Carton {
  @PrimaryGeneratedColumn('increment')
  cartonId: number;
  @Column({default:0})
  aciertos?: number;

  @ManyToOne(() => Partida, (partida) => partida.cartones, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idPartida' })
  partida: Partida;

  @ManyToOne(() => Registro, (registro) => registro.usuarioId, { eager: true })
  @JoinColumn({ name: 'idUsuario'})
  idUsuario?: Registro;

  @OneToMany(() => Fila, (fila) => fila.carton, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'filaId' })
  public fila: Fila[];

  constructor(idUsuario: number, partida: Partida, aciertos?: number) {
    this.aciertos = aciertos;
    this.partida = partida
  }

  public getaciertos(): number {
    return this.aciertos;
  }
  public setaciertos(aciertos: number): void {
    this.aciertos = aciertos;
  }
  }

