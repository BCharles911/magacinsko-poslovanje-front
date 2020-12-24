import { Observable } from 'rxjs';
import { PoslovniPartneriService } from './../_services/poslovni-partneri.service';
import { Component, OnInit } from '@angular/core';
import { PoslovniPartner } from '../_model/PoslovniPartner';

@Component({
  selector: 'app-poslovni-partneri',
  templateUrl: './poslovni-partneri.component.html',
  styleUrls: ['./poslovni-partneri.component.scss']
})
export class PoslovniPartneriComponent implements OnInit {

  poslovniPartneri$: Observable<PoslovniPartner[]>;
  partner: PoslovniPartner = new PoslovniPartner();

  constructor(private poslovniPartnerService : PoslovniPartneriService) { }

  ngOnInit(): void {

    this.poslovniPartneri$ = this.poslovniPartnerService.getAll();
  }



  setPartner(p){
    this.partner = p;
  }


}
