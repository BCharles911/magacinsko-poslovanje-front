import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KategorijaArtikala } from '../_model/KategorijaArtikala';

const KATEGORIJA_URL = "http://localhost:8080/api/kategorija-artikala/";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class KategorijaArtikalaService {

  constructor(private http : HttpClient) { }


  getAll(): Observable<KategorijaArtikala[]> {
    return this.http.get<any>(KATEGORIJA_URL + "all");
  }
}
