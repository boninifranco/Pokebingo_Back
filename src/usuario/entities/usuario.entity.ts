import { Registro } from 'src/registro/entities/registro.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({default:''})
  apellido: string;
  @Column({default:''})
  nombre: string;
  @Column({default:''})
  dni: string;
  @Column({default:''})
  celular: string;
  @Column({default:''})
  direccion: string;
  @OneToOne(() => Registro,(registro)=> registro.id,{ onDelete: 'CASCADE' },)
  @JoinColumn({ name: 'registroId'})
  registro: number;

}
