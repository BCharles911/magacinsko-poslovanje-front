import { PrometniDokument } from './../_model/PrometniDokument';
import { Observable } from 'rxjs';
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

  getPrijemnice() : Observable<PrometniDokument[]> {
    return this.http.get<any>(PROMETNI_URL + 'prijemnice')
  }


  proknjiziPrijemnicu(
    magacin: Magacin,
    poslovniPartner: PoslovniPartner,
    stavkePrometnogDokumenta: StavkaPrometnogDokumenta[],
    datumKr,
  ) {
    var datumKreiranja = datumKr;
    console.log(datumKreiranja)
    return this.http.post(
      PROMETNI_URL + "create-prijemnica",
      {
        magacin,
        poslovniPartner,
        stavkePrometnogDokumenta,
        datumKreiranja
      },
      httpOptions
    );
  }

  proknjiziOtpremnicu(
    magacin: Magacin,
    poslovniPartner: PoslovniPartner,
    stavkePrometnogDokumenta: StavkaPrometnogDokumenta[],
    datumKreiranja: string,
  ) {


    return this.http.post(
      PROMETNI_URL + "create-otpremnica",
      {
        magacin,
        poslovniPartner,
        stavkePrometnogDokumenta,
        datumKreiranja
      },
      httpOptions
    );
  }


}
