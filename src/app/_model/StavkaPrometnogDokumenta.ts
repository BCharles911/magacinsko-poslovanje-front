import { PrometniDokument } from './PrometniDokument';
import { Artikal } from './Artikal';
export class StavkaPrometnogDokumenta  {

  idStavkePrometnogDokumenta: number;
  cena: number;
  kolicina: number;
  vrednost: number;
  artikal: Artikal;
  prometniDokument: PrometniDokument;


  constructor(
    cena: number,
    vrednost: number,
    kolicina: number,
    artikal: Artikal
  ){
    this.cena = cena;
    this.vrednost = vrednost;
    this.kolicina = kolicina;
    this.artikal = artikal;
  }
}





