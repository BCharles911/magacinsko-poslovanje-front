import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mesto } from '../_model/Mesto';

const MESTO_URL = 'http://localhost:8080/api/mesto/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class MestoService {

  constructor(private http : HttpClient) {

   }

   getAll(): Observable<Mesto[]> {
    return this.http.get<any>(MESTO_URL + 'all');
   }

   createMesto(mesto : Mesto) {
     return this.http.post(MESTO_URL + "create", mesto, httpOptions);
   }

   deleteMesto(m){
     return this.http.put(MESTO_URL + "delete", {}, {params: {postanskiBroj : m.postanskiBroj}});
   }
}
