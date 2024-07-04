import { Registro } from 'src/registro/entities/registro.entity';
import {  Column,  Entity,  JoinColumn,  OneToOne,  PrimaryGeneratedColumn,} from 'typeorm';

@Entity()
export class Desempenio {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  puntos: number;
  @Column()
  creditos: number;
  @Column()
  cartonesComprados: number;
  @OneToOne((type) => Registro, (registro) => registro.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'jugadorId' })
  jugador: number;
}
