import { Registro } from 'src/registro/entities/registro.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  apellido: string;
  @Column()
  nombre: string;
  @Column('text')
  dni: string;
  @Column('text')
  celular: string;
  @Column('text')
  direccion: string;
  @OneToOne(() => Registro, { onDelete: 'CASCADE' })
  registro: number;
}
