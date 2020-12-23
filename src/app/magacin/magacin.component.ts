import { ModalPrijemnicaComponent } from './modal-prijemnica/modal-prijemnica.component';
import { ModalOtpremnicaComponent } from './modal-otpremnica/modal-otpremnica.component';
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
import { of, Observable } from 'rxjs';
@Component({
  selector: "ngbd-modal-content",
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{ prometniDokument?.idPrometnogDokumenta }}</h4>
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
          <tr *ngFor="let p of prometniDokument.stavkePrometnogDokumenta">
            <th scope="row">{{ p.idStavkePrometnogDokumenta }}</th>
            <td>{{ p.artikal }}</td>
            <td>{{ p.cena | number }} RSD</td>
            <td>{{ p.kolicina | number }}</td>
            <td>{{ p.vrednost | number }} RSD</td>
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
})
export class NgbdModalContent {
  @Input() prometniDokument;

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
          Full text search:
          <input class="form-control ml-2" type="text" [formControl]="filter" />
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
            <th scope="row">{{ i + 1}}</th>
            <td><ngb-highlight> {{a.cena | number }} RSD </ngb-highlight></td>
            <td><ngb-highlight [result]="a.datumNastanka" [term]="filter.value"></ngb-highlight></td>
            <td>{{ a.kolicina }}</td>
            <td>{{ a.smer }}</td>
            <td><ngb-highlight [result]="a.tipPrometa" [term]="filter.value"></ngb-highlight></td>
            <td><ngb-highlight [result]="a.vrednost | number" [term]="filter.value"></ngb-highlight></td>
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
export class NgbMagacinskeKartice {
  @Input() analitikeMagacinskeKartice$;
  filter = new FormControl("");

  constructor(public activeModal: NgbActiveModal, pipe: DecimalPipe) {
    this.analitikeMagacinskeKartice$ = this.filter.valueChanges.pipe(
      startWith(""),
      map((text) => this.search(text, pipe))
    );
  }

   search(text: string, pipe: PipeTransform): AnalitikaMagacinskeKartice[] {
    return this.analitikeMagacinskeKartice$.filter((a) => {
      const term = text.toLowerCase();
      return (
        a.datumNastanka.toLowerCase().includes(term) ||
        pipe.transform(a.vrednost).includes(term) ||
        a.tipPrometa.toLowerCase().includes(term)
      );
    });
  }

}

@Component({
  selector: "app-magacin",
  templateUrl: "./magacin.component.html",
  styleUrls: ["./magacin.component.scss"],
})
export class MagacinComponent implements OnInit {
  magacin$: Observable<Magacin>;

  constructor(
    private route: ActivatedRoute,
    private magacinService: MagaciniService,
    private location: Location,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getMagacin();
  }

  getMagacin(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.magacin$ = this.magacinService.getMagacin(id);
  }

  open(m) {
    const modalRef = this.modalService.open(NgbdModalContent, { size: "xl" });
    modalRef.componentInstance.prometniDokument = m;
  }

  openMag(m) {
    const modalRef = this.modalService.open(NgbMagacinskeKartice, {
      size: "xl",
      scrollable: true,
    });
    modalRef.componentInstance.analitikeMagacinskeKartice$ = of(m.analitikeMagacinskeKartice);
  }

  openPrijemnicaModal(){
    const modalRef = this.modalService.open(ModalPrijemnicaComponent, {size: 'xl'})
  }

  openOtpremnicaModal(){

    const modalRef = this.modalService.open(ModalOtpremnicaComponent, {size: 'xl'})

  }
}
