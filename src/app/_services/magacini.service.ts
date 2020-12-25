import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Magacin } from '../_model/Magacin';

const MAGACIN_URL = "http://localhost:8080/api/magacin/";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

const httpStringOptions = {
  headers: new HttpHeaders({ "Content-Type": "text/html" }),
};

@Injectable({
  providedIn: 'root'
})
export class MagaciniService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Magacin[]> {
    return this.http.get<any>(MAGACIN_URL + "all");
  }

  getMagacin(id: number): Observable<Magacin> {
    return this.http.get<any>(MAGACIN_URL + "get-by-id/" + id);
  }

  createMagacin(nazivMagacina) {
    return this.http.post<string>(MAGACIN_URL + "create", nazivMagacina)
  }

}
