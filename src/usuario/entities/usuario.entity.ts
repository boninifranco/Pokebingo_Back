import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuarios')
export class Usuario {
    
    @PrimaryGeneratedColumn()
    id:number;
    @Column('text')
    apellido:string;
    @Column('text')
    nombre:string;
    @Column('text')
    celular:string;
    @Column('text')
    direccion:string;
    @Column('text')
    usuario:string;
    @Column('text')
    contrasena:string;
    @Column('boolean')
    administrador:boolean;
    @Column('boolean')
    logueado:boolean
}
