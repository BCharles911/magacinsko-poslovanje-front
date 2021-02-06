import { PrometniDokument } from './PrometniDokument';
import { Mesto } from "./Mesto";

export class PoslovniPartner{

  sifraPartnera: number;
  adresaPoslovnogPartnera: string;
  nazivPartnera: string;
  pib: string;
  tipPartnera: TIP_PARTNERA;
  mesto: Mesto;
  prometniDokumenti: PrometniDokument[];
}


export enum TIP_PARTNERA {
  KUPAC = "KUPAC",
  DOBAVLJAC = "DOBAVLJAC",
  DOBAVLJAC_I_KUPAC = "DOBAVLJAC_I_KUPAC"
}
