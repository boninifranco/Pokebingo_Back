import { Injectable } from '@nestjs/common';

@Injectable()
export class CasilleroService {
  private casilleros: any[] = [];

  getAllCasilleros(): any[] {
    return this.casilleros;
  }

  getCasilleroById(id: string): any {
    return this.casilleros.find(casillero => casillero.id === id);
  }

  createCasillero(casilleroData: any): any {
    const newCasillero = { id: Math.random().toString(), ...casilleroData }; 
    this.casilleros.push(newCasillero);
    return newCasillero;
  }

  deleteCasillero(id: string): { deleted: boolean } {
    const index = this.casilleros.findIndex(casillero => casillero.id === id);
    if (index !== -1) {
      this.casilleros.splice(index, 1);
      return { deleted: true };
    }
    return { deleted: false };
  }
}

