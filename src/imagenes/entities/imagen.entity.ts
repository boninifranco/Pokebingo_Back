import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('imagenes')
export class Imagen {
  @PrimaryGeneratedColumn('increment')
  imagenId: number;
  
  @Column()
  id: number;
  
  @Column()
  nombre: string;

  @Column()
  url: string;

  constructor(nombre: string, id: number, url:string ) {
    this.nombre = nombre;
    this.id = id;
    this.url = url;
  }
  public getNombre(): string {
    return this.nombre;
  }
  public getId(): number {
    return this.id;
  }
  public getUrl(): string {
    return this.url;
  }
  public setNombre(nombre: string): void {
    this.nombre = nombre;
  }
  public setId(id: number): void {
    this.id = id;
  }
  public setUrl(url: string): void {
    this.url = url;
  }
}
