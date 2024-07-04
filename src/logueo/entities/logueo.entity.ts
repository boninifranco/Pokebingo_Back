import { Partida } from 'src/partidas/entities/partida.entity';
import { Registro } from 'src/registro/entities/registro.entity';
import {  Column,  Entity,  JoinColumn,  ManyToOne,  OneToOne,  PrimaryGeneratedColumn,} from 'typeorm';

@Entity()
export class Logueo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  logueado: boolean = true;

  @Column({ type: 'timestamp' })
  login: Date;
  
  @Column()
  logout?: string;

  @ManyToOne((type) => Registro, (registro) => registro.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idUsuario' })
  idUsuario: number;

  @OneToOne((type) => Partida, (partida) => partida.partidaId)
  @JoinColumn({ name: 'idPartida' })
  idPartida: number;
}
