import { Resultado } from 'src/resultados/entities/resultado.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Puntajes {
  @PrimaryGeneratedColumn()  
  id: number;
  @Column()
  descripcion: string;
  @Column()
  puntos: number;

  @OneToMany(type=> Resultado, resultado => resultado.idPuntaje)  
  public resultados: Resultado[];  

  
}
