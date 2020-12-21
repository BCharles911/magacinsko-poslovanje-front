import { StavkaPrometnogDokumenta } from './StavkaPrometnogDokumenta';
import { MagacinskaKartica } from './MagacinskaKartica';
import { JedinicaMere } from './JedinicaMere';
import { KategorijaArtikala } from './KategorijaArtikala';
export class Artikal{

  sifraArtikla: number;
  nazivArtikla: string;
  jedinicaMere: JedinicaMere;
  kategorijaArtikala: KategorijaArtikala;
  magacinskeKartice: MagacinskaKartica[];
  stavkePrometnogDokumenta: StavkaPrometnogDokumenta[];

}
