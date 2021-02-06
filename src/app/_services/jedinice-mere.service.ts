import { JedinicaMere } from './../_model/JedinicaMere';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const JED_MERE_URL = "http://localhost:8080/api/jedinica-mere/";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};



@Injectable({
  providedIn: 'root'
})
export class JediniceMereService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<JedinicaMere[]> {
    return this.http.get<any>(JED_MERE_URL + "all");
  }

}
