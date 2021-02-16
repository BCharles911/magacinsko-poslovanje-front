import { PoslovnaGodinaService } from './../_services/poslovna-godina.service';
import { Component, OnInit } from '@angular/core';

const GODINA = 2021;
@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent implements OnInit {

  constructor(private poslovnaGodinaService : PoslovnaGodinaService) { }

  ngOnInit(): void {
  }


  zakljuci() {
    this.poslovnaGodinaService.zakljuciPoslovnuGodinu(GODINA).subscribe(
      (response) => {
        alert('zakljucena uspeno');
      },
      (err) => {
        alert('greska brat moooi')
      }
    )

  }

}
