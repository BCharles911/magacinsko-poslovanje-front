import { PrometniDokumentiService } from './../_services/prometni-dokumenti.service';
import { ModalPrijemnicaComponent } from "./modal-prijemnica/modal-prijemnica.component";
import { ModalOtpremnicaComponent } from "./modal-otpremnica/modal-otpremnica.component";
import { AnalitikaMagacinskeKartice } from "./../_model/AnalitikaMagacinskeKartice";
import { MagacinskaKartica } from "./../_model/MagacinskaKartica";
import { PrometniDokument } from "./../_model/PrometniDokument";

import { MagaciniService } from "./../_services/magacini.service";
import { Component, Input, OnInit, PipeTransform } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Magacin } from "../_model/Magacin";
import { DecimalPipe, Location } from "@angular/common";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl } from "@angular/forms";
import { map, startWith } from "rxjs/operators";
import { of, Observable } from "rxjs";
import { saveAs } from 'file-saver';

@Component({
  selector: "ngbd-modal-content",
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Stavke prometnog dokumenta ID-a: {{ prometniDokument?.idPrometnogDokumenta }}</h4>
      <button
        type="button"
        class="close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <table class="table table-striped table-hover table-bordered table-sm">
        <thead class="thead-light">
          <tr>
            <th scope="col">Id stavke</th>
            <th scope="col">Artikal</th>
            <th scope="col">Cena</th>
            <th scope="col">Kolicina</th>
            <th scope="col">Vrednost</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let p of prometniDokument.stavkePrometnogDokumenta | slice: (page-1) * pageSize : page * pageSize">
            <th scope="row">{{ p.idStavkePrometnogDokumenta }}</th>
            <td>{{ p.artikal.nazivArtikla }}</td>
            <td>{{ p.cena | number }} RSD</td>
            <td>{{ p.kolicina | number }}</td>
            <td>{{ p.vrednost | number }} RSD</td>
          </tr>
        </tbody>
      </table>
      <hr>
      <ngb-pagination class="d-flex justify-content-center" [(page)]="page" [pageSize]="pageSize"
              [collectionSize]="prometniDokument.stavkePrometnogDokumenta?.length"></ngb-pagination>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-dark"
        (click)="activeModal.close('Close click')"
      >
        Close
      </button>
    </div>
  `,
})
export class NgbdModalContent implements OnInit {
  @Input() prometniDokument;
  page = 1;
  pageSize = 4;
  collectionSize = 10;

  ngOnInit(): void {
    console.log(this.prometniDokument);
  }

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: "ngbd-modal-content",
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Magacinska kartica</h4>

      <button
        type="button"
        class="close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form>
        <div class="form-group form-inline">
          Ukupna vrednost:
          <input class="form-control ml-2" type="text" [value]="(ukupnaVrednost | number) + ' RSD'" />
        </div>
      </form>
      <hr />
      <table class="table table-striped table-hover table-bordered table-sm">
        <thead class="thead-light">
          <tr>
            <th scope="col">Id Analitike</th>
            <th scope="col">Cena</th>
            <th scope="col">Datum nastanka</th>
            <th scope="col">Kolicina</th>
            <th scope="col">Smer</th>
            <th scope="col">Tip prometa</th>
            <th scope="col">Vrednost</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let a of analitikeMagacinskeKartice$ | async; index as i">
            <th scope="row">{{ a.idAnalitike }}</th>
            <td>{{ a.cena | number }} RSD</td>
            <td>
              <ngb-highlight
                [result]="a.datumNastanka"
                [term]="filter.value"
              ></ngb-highlight>
            </td>
            <td>{{ a.kolicina }}</td>
            <td>{{ a.smer }}</td>
            <td>
              <ngb-highlight
                [result]="a.tipPrometa"
                [term]="filter.value"
              ></ngb-highlight>
            </td>
            <td>
              <ngb-highlight
                [result]="a.vrednost | number"
                [term]="filter.value"
              ></ngb-highlight>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-dark"
        (click)="activeModal.close('Close click')"
      >
        Close
      </button>
    </div>
  `,
  providers: [DecimalPipe],
})
export class NgbMagacinskeKartice implements OnInit {
  @Input() analitikeMagacinskeKartice$;
  filter = new FormControl("");
  ukupnaVrednost;

  constructor(public activeModal: NgbActiveModal, pipe: DecimalPipe) {
    this.analitikeMagacinskeKartice$ = this.filter.valueChanges.pipe(
      startWith(""),

    );
  }

  ngOnInit(): void {
    this.analitikeMagacinskeKartice$.subscribe((response) => {
      this.ukupnaVrednost = response.reduce(function(prev,cur){
        return prev + cur.vrednost;
      }, 0);
    }

    );
  }

}

@Component({
  selector: "app-magacin",
  templateUrl: "./magacin.component.html",
  styleUrls: ["./magacin.component.scss"],
})
export class MagacinComponent implements OnInit {
  magacin$: Observable<Magacin>;
  idPoslovneGodine;

  page = 1;
  pageSize = 4;
  collectionSize = 10;
  pageD = 1;
  pageSizeD = 10;
  collectionSizeD = 10;
  magacinskeKartice: MagacinskaKartica[];
  prometniDokumenti: PrometniDokument[];
  detaljiDokumenta: PrometniDokument;

  constructor(
    private route: ActivatedRoute,
    private magacinService: MagaciniService,
    private location: Location,
    private modalService: NgbModal,
    private prometniDokumentiService: PrometniDokumentiService
  ) {}

  ngOnInit(): void {
    this.getMagacin();
    this.magacin$.subscribe(
      (m) =>
      {
        (this.idPoslovneGodine = m.magacinskeKartice[0]?.poslovnaGodina?.idGodine)
        this.magacinskeKartice = m.magacinskeKartice.sort((a,b) => a.idMagacinskeKartice - b.idMagacinskeKartice);
        this.prometniDokumenti = m.prometniDokument.sort((a,b) => a.idPrometnogDokumenta - b.idPrometnogDokumenta);
      }
    );


  }

  getMagacin(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.magacin$ = this.magacinService.getMagacin(id);
  }

  open(m) {
    console.log(m);

    const modalRef = this.modalService.open(NgbdModalContent, { size: "xl" });
    modalRef.componentInstance.prometniDokument = m;
  }

  showDetails(m){
    this.detaljiDokumenta = m;
  }

  openMag(m) {
    const modalRef = this.modalService.open(NgbMagacinskeKartice, {
      size: "xl",
      scrollable: true,
    });
    modalRef.componentInstance.analitikeMagacinskeKartice$ = of(
      m.analitikeMagacinskeKartice
    );
  }

  openPrijemnicaModal() {
    const modalRef = this.modalService.open(ModalPrijemnicaComponent, {
      size: "xl",
    });
  }

  openOtpremnicaModal() {
    const modalRef = this.modalService.open(ModalOtpremnicaComponent, {
      size: "xl",
    });
  }

  printFile() {}

  printLagerList() {
    const idMagacina = +this.route.snapshot.paramMap.get("id");
    this.magacinService
      .generateReport(idMagacina, this.idPoslovneGodine)
      .subscribe(
        (m) => {
          console.log(m)
          saveAs(m,'izvestaj.pdf')
        } ,
        (err) => console.log(err.message)
      );
  }

  printReport(idPrometnogDokumenta){
    const idMagacina = +this.route.snapshot.paramMap.get("id");
    this.magacinService.generatePrometniDokument(idMagacina,idPrometnogDokumenta).subscribe((r) => {
      console.log(r);
      saveAs(r,'prometnidokument.pdf')
    })

  }


  otkaziDokument(idPrometnogDokumenta){
    this.prometniDokumentiService.otkaziDokument(idPrometnogDokumenta).subscribe(r => {
      window.location.reload();
      console.log(r)
    }
    )}

}
