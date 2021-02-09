import { TokenStorageService } from './../_services/token-storage.service';
import { PrometniDokumentiService } from './../_services/prometni-dokumenti.service';
import { PrometniDokument } from './../_model/PrometniDokument';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-otpremnica',
  templateUrl: './lista-otpremnica.component.html',
  styleUrls: ['./lista-otpremnica.component.scss']
})
export class ListaOtpremnicaComponent implements OnInit {
  showAdminOptions = false;
  prometniDokumenti: PrometniDokument[];
  page = 1;
  pageSize = 4;
  collectionSize = 10;

  constructor(
    private prometniDokumentiService: PrometniDokumentiService,
    private tokenStorageService: TokenStorageService) { }

    ngOnInit(): void {
      this.showAdminOptions = this.tokenStorageService
      .getUser()
      .roles.includes("ROLE_ADMIN");
      this.prometniDokumentiService.getOtpremnice().subscribe(p => this.prometniDokumenti = p);
    }

    proknjiziOtpremnicu(idPrometnogDokumenta){
      this.prometniDokumentiService.proknjiziOtpremnicu(idPrometnogDokumenta).subscribe(r =>{
        console.log(r);
        window.location.reload();
      })
    }

    proknjiziPrijemnicu(idPrometnogDokumenta){

      this.prometniDokumentiService.proknjiziPrijemnicu(idPrometnogDokumenta).subscribe(r =>{
        console.log(r);
        window.location.reload();
      })

    }

    otkaziPrijemnicu(idPrometnogDokumenta){
      this.prometniDokumentiService.otkaziDokument(idPrometnogDokumenta).subscribe(r =>{ console.log(r)
      window.location.reload()});
    }
}
