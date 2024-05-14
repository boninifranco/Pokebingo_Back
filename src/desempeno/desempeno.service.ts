
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDesempenoDto } from './dto/create-desempeno.dto';
import { UpdateDesempenoDto } from './dto/update-desempeno.dto';
import { Desempeno } from './entities/desempeno.entity';
import { setId } from 'src/funciones/funciones';
import { UsuarioService } from 'src/usuario/usuario.service';

const baseUrl = 'http://localhost:3030/desempeno'
@Injectable()
export class DesempenoService {

  constructor(
    private readonly usuarioService : UsuarioService
  ){}

  async create(createDesempenoDto: CreateDesempenoDto): Promise<Desempeno> {
    const datos = await this.findAll();
    const id = datos[0]?setId(datos[datos.length-1].id):setId(0)
    const newDesempeno = {...createDesempenoDto,id}
    const idJugador:number = newDesempeno.jugador;
    const usuarios = await this.usuarioService.findAll();
    const desempenos = await this.findAll();       
    const existeUsuario = usuarios.find(usuario=> Number(usuario.id)===idJugador);
    const existeDesempeno = desempenos.find(desempeno=> Number(desempeno.jugador===idJugador));
    if (existeUsuario){
      if(!existeDesempeno){
        const res = await fetch(baseUrl,{
          method: 'POST',
          headers: {
            'Content-type':'application/json'
          },
          body: JSON.stringify(newDesempeno)
        });
        const parsed = res.json();
        return parsed;
      }else{
      throw new BadRequestException(`El desempeño para el usuario con id ${idJugador} ya existe`)
      }      
    }else{
      throw new BadRequestException(`El usuario con id ${idJugador} no esta registrado`)
    }
  }

  async findAll():Promise<Desempeno[]> {
    const res = await fetch(baseUrl);
    const parsed = await res.json();
    return parsed;
  }

  async findOne(id: number):Promise<Desempeno> {
    const res = await fetch(`${baseUrl}/${id}`)
    const parsed = await res.json()
    return parsed;
  }

  update(id: number, updateDesempenoDto: UpdateDesempenoDto) {
    return `This action updates a #${id} desempeno`;
  }

  remove(id: number) {
    return `This action removes a #${id} desempeno`;
  }
}