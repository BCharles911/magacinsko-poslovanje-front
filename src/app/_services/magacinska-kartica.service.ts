import { MagacinskaKartica } from './../_model/MagacinskaKartica';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';



const MAGACINSKA_URL = "http://localhost:8080/api/magacinska-kartica/";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class MagacinskaKarticaService {

  constructor(private http: HttpClient)  { }


  getBySifraArtikla(sifraArtikla): Observable<MagacinskaKartica> {
    return this.http.get<MagacinskaKartica>(MAGACINSKA_URL + "get-by-sifra-artikla/"+sifraArtikla);
  }
}
