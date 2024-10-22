import { Registro } from 'src/registro/entities/registro.entity';
import { Resultado } from 'src/resultados/entities/resultado.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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
  @OneToMany(type=> Resultado, resultado => resultado.partida)
  @JoinColumn()
  public resultados: Resultado[];
}
