import { Fila } from 'src/filas/entities/fila.entity';
import { Logueo } from 'src/logueo/entities/logueo.entity';
import { Partida } from 'src/partidas/entities/partida.entity';
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';

@Entity('cartones')
export class Carton {
  @PrimaryGeneratedColumn('increment')
  cartonId: number;
  @Column()
  aciertos: number;
  @Column()
  idUsuario: number;

  @ManyToOne(() => Partida, (partida) => partida.cartones)
  @JoinColumn({ name: 'partidaId' })
  partida: Partida;

  @ManyToOne(() => Logueo, (logueo) => logueo.carton)
  @JoinColumn({ name: 'idUsuario' })
  public logueo: Logueo;

  @OneToMany(() => Fila, (fila) => fila.carton, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'chatId' })
  public fila: Fila[];

  constructor(aciertos: number, idUsuario: number) {
    this.aciertos = 0;
    this.idUsuario = 0;
  }

  public getaciertos(): number {
    return this.aciertos;
  }
  public setaciertos(aciertos: number): void {
    this.aciertos = aciertos;
  }
  public getidUsuario(): number {
    return this.idUsuario;
  }
  public setidUsuario(idUsuario: number): void {
    this.idUsuario = idUsuario;
  }
}
