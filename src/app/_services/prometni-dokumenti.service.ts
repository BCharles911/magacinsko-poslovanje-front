import { Magacin } from "./../_model/Magacin";
import { PoslovniPartner } from "./../_model/PoslovniPartner";
import { StavkaPrometnogDokumenta } from "./../_model/StavkaPrometnogDokumenta";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

const PROMETNI_URL = "http://localhost:8080/api/prometni-dokument/";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class PrometniDokumentiService {
  dateString;
  constructor(private http: HttpClient) {}

  proknjiziPrijemnicu(
    magacin: Magacin,
    poslovniPartner: PoslovniPartner,
    stavkePrometnogDokumenta: StavkaPrometnogDokumenta[],
    danasnjiDatum: string,
    vreme: string,
    ukupnaCena: number,
    cenaSaRabatom: number,
    cenaSaPDV: number,
    tipDokumenta: string
  ) {
    var date = new Date(danasnjiDatum);
    return this.http.post(
      PROMETNI_URL + "prijmenica-proknjizi",
      {
        magacin,
        poslovniPartner,
        stavkePrometnogDokumenta,
        date,
        ukupnaCena,
        cenaSaRabatom,
        cenaSaPDV,
        tipDokumenta
      },
      httpOptions
    );
  }

  proknjiziOtpremnicu(
    magacin: Magacin,
    poslovniPartner: PoslovniPartner,
    stavkePrometnogDokumenta: StavkaPrometnogDokumenta[],
    danasnjiDatum: string,
    vreme: string,
    ukupnaCena: number,
    cenaSaRabatom: number,
    cenaSaPDV: number,
    tipDokumenta: string
  ) {
    var date = new Date(danasnjiDatum);

    return this.http.post(
      PROMETNI_URL + "proknjizi",
      {
        magacin,
        poslovniPartner,
        stavkePrometnogDokumenta,
        date,
        ukupnaCena,
        cenaSaRabatom,
        cenaSaPDV,
        tipDokumenta
      },
      httpOptions
    );
  }


}
