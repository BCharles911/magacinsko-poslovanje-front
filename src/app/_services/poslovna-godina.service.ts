import { PoslovnaGodina } from './../_model/PoslovnaGodina';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Positioning } from '@ng-bootstrap/ng-bootstrap/util/positioning';

@Injectable({
  providedIn: 'root'
})
export class PoslovnaGodinaService {

  constructor(private http : HttpClient) { }


  zakljuciPoslovnuGodinu(idGodine){
    return this.http.get('http://localhost:8080/api/poslovna-godina/'+ idGodine + '/zakljuci');
  }

  getById(idGodine){
    return this.http.get<PoslovnaGodina>('http://localhost:8080/api/poslovna-godina/get-by-id/'+ idGodine);
  }


}
