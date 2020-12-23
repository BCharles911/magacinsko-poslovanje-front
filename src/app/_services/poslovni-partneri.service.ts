import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoslovniPartner } from '../_model/PoslovniPartner';


const POSLOVNI_URL = 'http://localhost:8080/api/poslovni-partner/'

@Injectable({
  providedIn: 'root'
})
export class PoslovniPartneriService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<PoslovniPartner[]> {
    return this.http.get<any>(POSLOVNI_URL + "all");
  }

  getByDobavljaci(): Observable<PoslovniPartner[]> {
    return this.http.get<any>(POSLOVNI_URL + "dobavljaci")
  }
}
