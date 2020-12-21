import { PrometniDokument } from './PrometniDokument';
import { MagacinskaKartica } from './MagacinskaKartica';
import { Preduzece } from "./Preduzece";

export class Magacin {
  sifraMagacina: number;
  nazivMagacina: string;
  preduzece: Preduzece;
  magacinskeKartice: MagacinskaKartica[];
  prometniDokument: PrometniDokument[];
  expanded: false;
}
