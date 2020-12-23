import { PoslovniPartneriService } from "./../_services/poslovni-partneri.service";
import { PoslovniPartner } from "./../_model/PoslovniPartner";
import { Observable } from "rxjs";
import { MagaciniService } from "./../_services/magacini.service";
import { Component, OnInit } from "@angular/core";
import { Magacin } from "../_model/Magacin";

@Component({
  selector: "app-prijemnica",
  templateUrl: "./prijemnica.component.html",
  styleUrls: ["./prijemnica.component.scss"],
})
export class PrijemnicaComponent implements OnInit {
  magacini: Magacin[] = [];
  poslovniPartneri: PoslovniPartner[] = [];
  selectedPoslovniPartner = null;
  selectedMagacin = null;
  todaysDate;
  currentTime;
  constructor(
    private magaciniService: MagaciniService,
    private poslovniPartneriService: PoslovniPartneriService
  ) {}

  ngOnInit(): void {
    this.getTodaysDate();
    this.magaciniService.getAll().subscribe((response) => {
      this.magacini = response;
      this.selectedMagacin = response[0];
    });

    this.poslovniPartneriService.getByDobavljaci().subscribe((response) =>{
      this.poslovniPartneri = response;
      this.selectedPoslovniPartner = response[0];
    })
  }

  getTodaysDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    var hours = today.getHours();
    var minutes = today.getMinutes();

    this.currentTime = hours + ":" + minutes;
    return (this.todaysDate = mm + "/" + dd + "/" + yyyy);
  }
}
