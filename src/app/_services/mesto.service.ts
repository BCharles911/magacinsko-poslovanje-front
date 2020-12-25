import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mesto } from '../_model/Mesto';

const MESTO_URL = 'http://localhost:8080/api/mesto/'

@Injectable({
  providedIn: 'root'
})
export class MestoService {

  constructor(private http : HttpClient) {

   }

   getAll(): Observable<Mesto[]> {
    return this.http.get<any>(MESTO_URL + 'all');
   }
}
