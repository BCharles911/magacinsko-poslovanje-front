import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoslovniPartner } from '../_model/PoslovniPartner';


const POSLOVNI_URL = 'http://localhost:8080/api/poslovni-partner/'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PoslovniPartneriService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<PoslovniPartner[]> {
    return this.http.get<any>(POSLOVNI_URL + "all").pipe(
      map(results => results.sort((a,b) => a.sifraPartnera < b.sifraPartnera ? -1 :1))
    );
  }

  getByDobavljaci(): Observable<PoslovniPartner[]> {
    return this.http.get<any>(POSLOVNI_URL + "dobavljaci")
  }

  getByKupci(): Observable<PoslovniPartner[]> {
    return this.http.get<any>(POSLOVNI_URL + "kupci")

  }

  deletePoslovniPartner(p) {
    return this.http.put(POSLOVNI_URL + "delete", {}, {params: {sifraPartnera : p.sifraPartnera}});
  }


  createNewPartner(partner) {
    return this.http.post<PoslovniPartner>(POSLOVNI_URL + "create", partner, httpOptions);
  }

  update(partner): Observable<any> {

    return this.http.put(
      POSLOVNI_URL + "update" ,
      partner,
      httpOptions
    )
  }
}
