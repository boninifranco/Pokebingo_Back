import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Puntajes {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  descripcion: string;
  @Column()
  puntos: number;
}
