import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('imagenes')
export class Imagen {
  @PrimaryGeneratedColumn('increment')
  imagenId: number;
  
  @Column()
  imagen: string;

  constructor(imagen: string, casillero: number) {
    this.imagen = imagen;
  }
  public getImagen(): string {
    return this.imagen;
  }
  public setImagen(imagen: string): void {
    this.imagen = imagen;
  }
}
