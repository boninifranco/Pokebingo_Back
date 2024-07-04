import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Res, HttpStatus, HttpCode, Put, UseGuards} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth/auth.guard';

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
  @HttpCode(HttpStatus.FOUND)  
  async findOne(@Res() res: Response, @Param('id', ParseIntPipe) id: number):Promise<Usuario>{
    const usuario = await this.usuarioService.findOne(id)
    
    if(usuario){
      res.status(HttpStatus.FOUND).json(usuario);
      return usuario;      
    }
    res.status(HttpStatus.NOT_FOUND).json({message: `Usuario con id ${id} no encontrado`});
  };
  
  @Patch(':id')
  async update(@Res() res: Response,@Param('id', ParseIntPipe) id: number, @Body() updateUsuarioDto: UpdateUsuarioDto):Promise<Usuario> {
    const usuarioUpdate = await this.usuarioService.update(id, updateUsuarioDto);
    if(usuarioUpdate){
      res.status(HttpStatus.FOUND).json(usuarioUpdate);
      return usuarioUpdate;      
    }
    res.status(HttpStatus.NOT_FOUND).json({message: `Usuario con id ${id} no encontrado`});    
  };

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Res() res: Response,@Param('id', ParseIntPipe) id: number) {
    const usuarioDelete = await this.usuarioService.remove(id)
    if(usuarioDelete){
      res.status(HttpStatus.FOUND).json(usuarioDelete);      
    }else{
      res.status(HttpStatus.NOT_FOUND).json({message: `Usuario con id ${id} no encontrado`})}   
    ;
  }
}
