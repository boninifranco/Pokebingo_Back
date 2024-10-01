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

  @OneToMany(() => Logueo, (logueo) => logueo.idUsuario, { cascade: true })
  @OneToOne(() => Desempenio, (desempenio) => desempenio.jugador, {
    cascade: true,
  })
  @OneToOne(() => Usuario,(usuario) => usuario.id,{ onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'usuarioId' })
  usuarioId: number;
}
