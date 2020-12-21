import { Artikal } from './Artikal';
import { Preduzece } from './Preduzece';
export class KategorijaArtikala {
  idKategorije: number;
  nazivKategorije: string;
  artikli: Artikal[];
  preduzece: Preduzece;
}
