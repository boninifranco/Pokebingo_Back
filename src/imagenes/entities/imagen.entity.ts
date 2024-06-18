import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('imagenes')
export class Imagen {
    @PrimaryGeneratedColumn()
    imagenId: number;
    @Column()
    imagen: string;
    
  constructor(id: number, imagen: string){
    this.imagenId = id;
    this.imagen = imagen;
  }
  public getImagen(): string {return this.imagen};
  public setImagen(imagen: string): void {this.imagen = imagen};
  }