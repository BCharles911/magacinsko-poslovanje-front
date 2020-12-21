import { Radnik } from './Radnik';
import { Magacin } from './Magacin';
import { KategorijaArtikala } from "./KategorijaArtikala";
import { Mesto } from './Mesto';

export class Preduzece {
  sifraPreduzeca: number;
  adresaPreduzeca: string;
  nazivPreduzeca: string;
  pib: string;
  kategorijeArtikala: KategorijaArtikala[];
  magacini: Magacin[];
  mesto: Mesto;
  radnik: Radnik;
}
