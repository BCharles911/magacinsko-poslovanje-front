import { PrometniDokument } from './PrometniDokument';
import { MagacinskaKartica } from './MagacinskaKartica';
export class PoslovnaGodina {
  idGodine: number;
  godina: Date;
  zakljucena: boolean;
  magacinskeKartice: MagacinskaKartica[];
  prometniDokumenti: PrometniDokument[];
}
