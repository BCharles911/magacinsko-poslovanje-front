import { Observable } from 'rxjs';
import { PrometniDokument } from './../_model/PrometniDokument';
import { TokenStorageService } from './../_services/token-storage.service';
import { PrometniDokumentiService } from './../_services/prometni-dokumenti.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-lista-prijemnica',
  templateUrl: './lista-prijemnica.component.html',
  styleUrls: ['./lista-prijemnica.component.scss']
})
export class ListaPrijemnicaComponent implements OnInit {
  showAdminOptions = false;
  prometniDokumenti$: Observable<PrometniDokument[]>;


  constructor(
    private prometniDokumentiService: PrometniDokumentiService,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.showAdminOptions = this.tokenStorageService
    .getUser()
    .roles.includes("ROLE_ADMIN");
    this.prometniDokumenti$ = this.prometniDokumentiService.getPrijemnice();
  }

}
