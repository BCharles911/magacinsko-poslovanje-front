import { PoslovnaGodina } from './PoslovnaGodina';
import { Magacin } from './Magacin';
import { Artikal } from './Artikal';
import { AnalitikaMagacinskeKartice } from './AnalitikaMagacinskeKartice';
export class MagacinskaKartica {

  idMagacinskeKartice: number;
  cena: number;
  kolicinaIzlaza: number;
  kolicinaPocetnogStanja: number;
  kolicinaUlaza: number;
  redniBrMagacinskeKar: number;
  ukupnaKolicina: number;
  ukupnaVrednost: number;
  vrednostIzlaza: number;
  vrednostPocetnogStanja: number;
  vrednostUlaza: number;
  analitikeMagacinskeKartice: AnalitikaMagacinskeKartice[];
  artikal: Artikal;
  magacin: Magacin;
  poslovnaGodina: PoslovnaGodina;
}
