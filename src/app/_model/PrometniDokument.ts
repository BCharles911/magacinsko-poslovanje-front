import { StavkaPrometnogDokumenta } from './StavkaPrometnogDokumenta';
import { PoslovniPartner } from './PoslovniPartner';
import { PoslovnaGodina } from './PoslovnaGodina';
import { Magacin } from './Magacin';
export class PrometniDokument {
  idPrometnogDokumenta: number;
  brojPrometnogDokumenta: number;
  datumFormiranja: Date;
  datumKnjizenja: Date;
  redniBrojDokumenta: number;
  status: string;
  tipPrometnogDokumenta: string;
  magacin: Magacin;
  poslovnaGodina: PoslovnaGodina;
  poslovniPartner: PoslovniPartner;
  stavkePrometnogDokumenta: StavkaPrometnogDokumenta[];

}
