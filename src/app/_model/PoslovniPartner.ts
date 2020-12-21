import { PrometniDokument } from './PrometniDokument';
import { Mesto } from "./Mesto";

export class PoslovniPartner{

  sifraPartnera: number;
  adresaPoslovnogPartnera: string;
  nazivPartnera: string;
  pib: string;
  tipPartnera: string;
  mesto: Mesto;
  prometniDokumenti: PrometniDokument[];
}
