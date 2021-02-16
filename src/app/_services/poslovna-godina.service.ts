import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PoslovnaGodinaService {

  constructor(private http : HttpClient) { }


  zakljuciPoslovnuGodinu(idGodine){
    return this.http.get('http://localhost:8080/api/poslovna-godina/'+ idGodine + '/zakljuci');
  }



}
