import { PoslovniPartner } from './PoslovniPartner';
import { Preduzece } from './Preduzece';
export class Mesto {
  postanskiBroj: string;
  drzava: string;
  nazivMesta: string;
  poslovniPartneri: PoslovniPartner[];
  preduzeca: Preduzece[];
}
