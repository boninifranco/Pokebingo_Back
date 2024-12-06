import { Carton } from 'src/cartones/entities/carton.entity';
import { Desempenio } from 'src/desempenio/entities/desempenio.entity';
import { Logueo } from 'src/logueo/entities/logueo.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique,} from 'typeorm';

@Entity()
@Unique(['usuarioId'])
export class Registro {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  email: string;
  @Column()
  contrasenia: string;

  @Column('boolean', {default: false})
  administrador: boolean;

  @Column({default:''})
  userName:string;

  @Column({default:''})
  avatar: string;

  @OneToMany(() => Logueo, (logueo) => logueo.idUsuario, { cascade: true })
  @OneToOne(() => Desempenio, (desempenio) => desempenio.jugador, {
    cascade: true,
  })

  @OneToMany(() => Carton, (carton) => carton.cartonId, { cascade: true })
  @JoinColumn({name:'idUsuario'})
  idUsuario: Registro

  @OneToOne(() => Usuario,(usuario) => usuario.id,{ onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'usuarioId' })
  usuarioId: number;
}
