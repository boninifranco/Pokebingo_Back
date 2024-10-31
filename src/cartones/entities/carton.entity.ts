import { Fila } from 'src/filas/entities/fila.entity';
import { Logueo } from 'src/logueo/entities/logueo.entity';
import { Partida } from 'src/partidas/entities/partida.entity';
import { Registro } from 'src/registro/entities/registro.entity';
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';

@Entity('cartones')
export class Carton {
  @PrimaryGeneratedColumn('increment')
  cartonId: number;
  @Column({default:0})
  aciertos?: number;

  //@Column({default:null})
  //idUsuario?: Registro;
  

  @ManyToOne(() => Partida, (partida) => partida.cartones, { eager: true })
  @JoinColumn({ name: 'idPartida' })
  partida: Partida;

  //@Column({default:null})
  //idUsuario?:Registro;

  //@OneToOne(() => Logueo, (logueo) => logueo.id)
 //@JoinColumn({ name: 'idUsuario' })

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

