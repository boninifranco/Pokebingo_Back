import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Res, HttpStatus, HttpCode} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Response } from 'express';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  };

  @Get()
  @HttpCode(HttpStatus.FOUND)
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')  
  async findOne(@Res() res: Response, @Param('id', ParseIntPipe) id: number):Promise<Usuario|null>{
    const usuario = await this.usuarioService.findOne(id)
    
    if(usuario){
      res.status(HttpStatus.FOUND).json(usuario);
      return;      
    }
    res.status(HttpStatus.NOT_FOUND).json({message: `Usuario con id ${id} no encontrado`});
  };
  
  @Patch(':id')
  async update(@Res() res: Response,@Param('id', ParseIntPipe) id: number, @Body() updateUsuarioDto: UpdateUsuarioDto):Promise<Usuario|null> {
    const usuarioUpdate = await this.usuarioService.update(id, updateUsuarioDto);
    if(usuarioUpdate){
      res.status(HttpStatus.FOUND).json(usuarioUpdate);
      return usuarioUpdate;      
    }
    res.status(HttpStatus.NOT_FOUND).json({message: `Usuario con id ${id} no encontrado`});    
  };

  @Delete(':id')
  async remove(@Res() res: Response,@Param('id', ParseIntPipe) id: number):Promise<Usuario|null> {
    const usuarioDelete = await this.usuarioService.remove(id)
    if(usuarioDelete){
      res.status(HttpStatus.FOUND).json(usuarioDelete);
      return usuarioDelete;
    }else{
      res.status(HttpStatus.NOT_FOUND).json({message: `Usuario con id ${id} no encontrado`})}   
    ;
  }
}
