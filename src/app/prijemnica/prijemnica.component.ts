import { StavkaPrometnogDokumenta } from "./../_model/StavkaPrometnogDokumenta";
import { ArtikliService } from "./../_services/artikli.service";
import { PoslovniPartneriService } from "./../_services/poslovni-partneri.service";
import { PoslovniPartner } from "./../_model/PoslovniPartner";
import { Observable } from "rxjs";
import { MagaciniService } from "./../_services/magacini.service";
import { Component, OnInit } from "@angular/core";
import { Magacin } from "../_model/Magacin";
import { Artikal } from "../_model/Artikal";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-prijemnica",
  templateUrl: "./prijemnica.component.html",
  styleUrls: ["./prijemnica.component.scss"],
})
export class PrijemnicaComponent implements OnInit {
  magacini: Magacin[] = [];
  poslovniPartneri: PoslovniPartner[] = [];
  artikli: Artikal[] = [];
  artikal = null;
  selectedPoslovniPartner = null;
  selectedMagacin = null;
  todaysDate;
  currentTime;
  rabat = 0;
  pdv = 10;
  pocetnaUkupnaCena = 0;
  cenaSaRabatom = 0;
  cenaSaPdv = 0;
  ukupnaCenaSvihStavki = 0;
  stavkaForm: FormGroup;
  stavkeToSend: StavkaPrometnogDokumenta[] = [];
  stavkaDokumenta: StavkaPrometnogDokumenta = new StavkaPrometnogDokumenta(
    0,
    0,
    0,
    null
  );
  disablePDVNotZero = true;

  constructor(
    private magaciniService: MagaciniService,
    private poslovniPartneriService: PoslovniPartneriService,
    private artikliService: ArtikliService
  ) {
    this.stavkaForm = this.createFormGroup();
  }

  ngOnInit(): void {
    this.getTodaysDate();
    this.magaciniService.getAll().subscribe((response) => {
      this.magacini = response;
      this.selectedMagacin = response[0];
    });

    this.poslovniPartneriService.getByDobavljaci().subscribe((response) => {
      this.poslovniPartneri = response;
      this.selectedPoslovniPartner = response[0];
    });

    this.artikliService.getAllArtikle().subscribe((response) => {
      this.artikli = response;
      this.artikal = response[0];
    });
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

  createFormGroup() {
    return new FormGroup({
      stavkaPrometnogDokumenta: new FormGroup({
        cena: new FormControl(),
        kolicina: new FormControl(),
        artikal: new FormControl(),
      }),
    });
  }

  onSubmit() {
    let ukcena =
      this.stavkaForm.value.stavkaPrometnogDokumenta.cena *
      this.stavkaForm.value.stavkaPrometnogDokumenta.kolicina;
    var pot = ukcena / 100;
    var cenaRabat = ukcena - pot * this.rabat;

    var cenaSaPDV = cenaRabat + pot * this.pdv;

    this.pushStavka(
      this.setStavka(
        this.stavkaForm.value.stavkaPrometnogDokumenta.cena,
        this.stavkaForm.value.stavkaPrometnogDokumenta.kolicina,
        this.stavkaForm.value.stavkaPrometnogDokumenta.cena *
          this.stavkaForm.value.stavkaPrometnogDokumenta.kolicina,
        this.artikal
      )
    );

    var cenaPDVRABAT = cenaSaPDV - pot * this.rabat;
    console.log("pocetna ukupna cena:" + ukcena);
    console.log("cena sa rabatom: " + cenaRabat);
    console.log("cena sa pdv: " + cenaSaPDV);
    //console.log("stavke: " + this.stavkeToSend[0].artikal.nazivArtikla);
    //this.stavkaForm.reset();
  }

  setStavka(cena, kolicina, vrednost, artikal) {
    this.stavkaDokumenta.cena = cena;
    this.stavkaDokumenta.kolicina = kolicina;
    this.stavkaDokumenta.vrednost = vrednost;
    this.stavkaDokumenta.artikal = artikal;
    return this.stavkaDokumenta;
    // this.stavkeToSend.push(this.stavkaDokumenta);
  }

  revert() {}

  pushStavka(stavka) {
    const alreadyExists = this.stavkeToSend.find(
      (s) => s.artikal.sifraArtikla == stavka.artikal.sifraArtikla
    );

    if (!alreadyExists) {
      this.stavkeToSend.push(
        new StavkaPrometnogDokumenta(
          stavka.cena,
          stavka.vrednost,
          stavka.kolicina,
          this.artikal
        )
      );
      this.pocetnaUkupnaCena = this.pocetnaUkupnaCena + stavka.vrednost;
      this.povecajRabat();
      this.povecajPDV();
     // this.povecajPDV();
    } else {
      this.updateStavka(
        stavka,
        this.stavkaForm.value.stavkaPrometnogDokumenta.cena,
        this.stavkaForm.value.stavkaPrometnogDokumenta.vrednost
      );
    }
    console.log(stavka.artikal.sifraArtikla);
    console.log(this.stavkeToSend);
  }



  updateStavka(stavka, cena, vrednost) {
    console.log("update");
  }

  removeStavka(stavka: StavkaPrometnogDokumenta) {
    var found = false;
    if (this.stavkeToSend.length != 0) {
      for (var i = 0; i <= this.stavkeToSend.length; i++) {
        if (
          this.stavkeToSend[i].artikal.sifraArtikla ==
          stavka.artikal.sifraArtikla
        ) {
          var removeIndex = this.stavkeToSend
            .map(function (stavka) {
              return stavka.artikal.sifraArtikla;
            })
            .indexOf(stavka.artikal.sifraArtikla);

          this.stavkeToSend.splice(removeIndex, 1);
          this.pocetnaUkupnaCena = this.pocetnaUkupnaCena - stavka.vrednost;
          this.povecajRabat();
          this.povecajPDV();
          //this.povecajPDV();
        } else {
          console.log("stavka nije u listi!");
        }
      }
    } else {
      console.log("lista je prazna");
    }
  }


  povecajRabat() {
    if(this.pocetnaUkupnaCena == 0) {
      return this.cenaSaRabatom = 0;
    }else if(this.rabat == 0){
      return this.cenaSaRabatom = this.pocetnaUkupnaCena;
    }
    const cenica = this.pocetnaUkupnaCena / 100;
    this.cenaSaRabatom = this.pocetnaUkupnaCena - this.rabat*cenica;

  }

  povecajPDV() {
    if(this.pocetnaUkupnaCena == 0){
      return this.cenaSaPdv = 0;
    }else if(this.pdv == 0){
      this.disablePDVNotZero = true;
    }
    const cenica = this.cenaSaRabatom / 100;
    this.disablePDVNotZero = false;
    this.cenaSaPdv = this.cenaSaRabatom + this.pdv*cenica;
  }

}
