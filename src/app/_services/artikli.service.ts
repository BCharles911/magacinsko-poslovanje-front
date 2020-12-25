import { Observable } from 'rxjs';
import { HttpInterceptor, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Artikal } from '../_model/Artikal';


const ARTIKLI_URL = 'http://localhost:8080/api/artikal/'

@Injectable({
  providedIn: 'root'
})
export class ArtikliService {

  constructor(private http : HttpClient) { }

  getAllArtikle(): Observable<Artikal[]> {

    return this.http.get<any>(ARTIKLI_URL + 'all');

  }

  deleteArtikal(artikal) {
    //let params = new HttpParams().set('sifraArtikla': aar)
    return this.http.put(ARTIKLI_URL + "delete",{}, {params: {sifraArtikla : artikal.sifraArtikla}} )

  }

  createArtikal(artikal: Artikal) {

  }
}
