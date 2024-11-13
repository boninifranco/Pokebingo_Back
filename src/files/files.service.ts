import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {

  getStaticPremioImage(imageName: string){

    const path = join(__dirname,'../../static-assets/premios', imageName)

    if (!existsSync(path))
      throw new BadRequestException(`no se encuentra el producto con la imagen ${imageName}`)

    return path;
  }
  
}
