import { Magacin } from './../_model/Magacin';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


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
    return this.http.get<Magacin>(MAGACIN_URL + "get-by-id/" + id).pipe(map(magacin => {
      const newMagacin = {...magacin,
        prometniDokument: magacin.prometniDokument.filter(pd => !pd.deleted)};
        return newMagacin;
    }));

  }

  createMagacin(nazivMagacina) {
    return this.http.post<string>(MAGACIN_URL + "create", nazivMagacina)
  }

  generateReport(idMagacina, idPoslovneGodine){
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get<any>("http://localhost:8080/magacini/" + idMagacina + "/poslovne-godine/" + idPoslovneGodine + "/lager-lista", { headers: headers, responseType: 'blob' as 'json' })
  }

  generatePrometniDokument(idMagacina, idPrometnogDokumenta){
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get<any>("http://localhost:8080/prometni-dokumenti/" + idPrometnogDokumenta + "/izvestaj", { headers: headers, responseType: 'blob' as 'json' })
  }
}
