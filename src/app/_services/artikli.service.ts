import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpInterceptor, HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Artikal } from '../_model/Artikal';


const ARTIKLI_URL = 'http://localhost:8080/api/artikal/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ArtikliService {

  constructor(private http : HttpClient) { }

  getAllArtikle(): Observable<Artikal[]> {

    return this.http.get<any>(ARTIKLI_URL + 'all').pipe(
      map(results => results.sort((a,b) => a.sifraArtikla < b.sifraArtikla ? -1 :1)));

  }

  deleteArtikal(artikal) {
    //let params = new HttpParams().set('sifraArtikla': aar)
    return this.http.put(ARTIKLI_URL + "delete",{}, {params: {sifraArtikla : artikal.sifraArtikla}} )

  }

  createArtikal(artikal) {

    return this.http.post(ARTIKLI_URL + "create", artikal, httpOptions);

  }

  update(artikal){
    return this.http.put(ARTIKLI_URL + "update", artikal, httpOptions)
  }
}
