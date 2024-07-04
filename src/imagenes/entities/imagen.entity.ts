import { Casillero } from 'src/casilleros/entities/casillero.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('imagenes')
export class Imagen {
  @PrimaryGeneratedColumn('increment')
  imagenId: number;
  @Column()
  imagen: string;

  @OneToOne(() => Casillero, casillero => casillero.imagen, {onDelete: 'CASCADE',})
  @JoinColumn ({ name: 'casilleroId' })
  public casillero: Casillero;

  constructor(imagen: string, casillero: Casillero) {
    this.imagen = imagen;
    if (casillero){
      this.casillero = casillero;
    }
  }
  public getImagen(): string {return this.imagen};
  public setImagen(imagen: string): void {this.imagen = imagen};
}
