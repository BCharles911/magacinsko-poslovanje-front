import { Observable } from 'rxjs';
import { HttpInterceptor, HttpClient } from '@angular/common/http';
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
}
