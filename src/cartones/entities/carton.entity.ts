import { Fila } from 'src/filas/entities/fila.entity';
import { Logueo } from 'src/logueo/entities/logueo.entity';
import { Partida } from 'src/partidas/entities/partida.entity';
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';

@Entity('cartones')
export class Carton {
  @PrimaryGeneratedColumn('increment')
  cartonId: number;
  @Column()
  aciertos: number;
  @Column({default:null})
  idUsuario?: number;
  

  @ManyToOne(() => Partida, (partida) => partida.cartones, { eager: true })
  @JoinColumn({ name: 'idPartida' })
  partida: number;

  

  @OneToOne(() => Logueo, (logueo) => logueo.id)
  @JoinColumn({ name: 'idUsuario' })

  @OneToMany(() => Fila, (fila) => fila.carton, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'chatId' })
  public fila: Fila[];


  constructor(aciertos: number, idUsuario: number, partida: number) {
    this.aciertos = 0;
    this.partida = partida
  }

  public getaciertos(): number {
    return this.aciertos;
  }
  public setaciertos(aciertos: number): void {
    this.aciertos = aciertos;
  }
  }

