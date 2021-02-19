import { PoslovnaGodinaService } from './../_services/poslovna-godina.service';
import { Component, OnInit } from '@angular/core';
import { PoslovnaGodina } from '../_model/PoslovnaGodina';

const GODINA = 2021;
@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent implements OnInit {

  poslovnaGodina : PoslovnaGodina;
  disable = true;
  constructor(private poslovnaGodinaService : PoslovnaGodinaService) { }

  ngOnInit(): void {
    this.poslovnaGodinaService.getById(GODINA).subscribe(response => {
      this.poslovnaGodina = response;
      var date = new Date();
      var currentYear = date.getFullYear();
      if(this.poslovnaGodina.idGodine !== currentYear ){
        this.disable = false;
      }
    })
  }


  zakljuci() {
    var date = new Date();
    var currentYear = date.getFullYear();
    if(this.poslovnaGodina.idGodine === 2023 ) {
      alert('godina nije zavrsena')
    }
    else{
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

  checkYear(){
    var date = new Date();
    var currentYear = date.getFullYear();
    console.log("godina poslovna: " + this.poslovnaGodina.idGodine)
    console.log(currentYear)
    console.log(currentYear == this.poslovnaGodina.idGodine)
    console.log(currentYear == Number(this.poslovnaGodina.idGodine))
    console.log('---------------------- tri jednakosti -----------------------')
    console.log(currentYear === this.poslovnaGodina.idGodine)
    console.log(currentYear === Number(this.poslovnaGodina.idGodine))

  }

}
