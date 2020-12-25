import { map } from 'rxjs/operators';
import { TokenStorageService } from './../_services/token-storage.service';
import { Mesto } from "./../_model/Mesto";
import { MestoService } from "./../_services/mesto.service";
import { FormGroup, FormControl } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { PoslovniPartneriService } from "./../_services/poslovni-partneri.service";
import { Component, Input, OnInit, Output } from "@angular/core";
import { PoslovniPartner } from "../_model/PoslovniPartner";
import { inputCursor } from "ngx-bootstrap-icons";
import { EventEmitter } from '@angular/core';

@Component({
  selector: "ngbd-modal-content",
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Novi partner</h4>
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
      <div class="row">
        <div class="col">
          <label>Mesto</label>
          <ng-select
            bindLabel="nazivMesta"
            [items]="mesta"
            [(ngModel)]="mesto"
          ></ng-select>
        </div>
        <div class="col">
        <label>Drzava</label>
        <input [value]="mesto?.drzava" disabled=true type="text" class="form-control" aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm">
        </div>
        <div class="col">
        <label>Postanski broj</label>
        <input [value]="mesto?.postanskiBroj" disabled=true type="text" class="form-control" aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm">
        </div>
      </div>

      <hr />
      <form
        [formGroup]="poslovniPartnerForm"
        (ngSubmit)="onSubmitPartnerCreate()"
        novalidate
      >
        <div class="form-group">
          <label for="nazivPartnera">Naziv partnera</label>
          <input
            type="text"
            formControlName="nazivPartnera"
            class="form-control"
            id="nazivPartnera"
            placeholder="Naziv partnera"
          />
        </div>

        <div class="form-group">
          <label for="pib">PIB</label>
          <input
            type="text"
            formControlName="pib"
            class="form-control"
            id="pib"
            placeholder="PIB"
          />
        </div>
        <div class="form-group">
          <label for="adresaPoslovnogPartnera">Adresa poslovnog partnera</label>
          <input
            type="text"
            formControlName="adresaPoslovnogPartnera"
            class="form-control"
            id="adresaPoslovnogPartnera"
            placeholder="Adresa"
          />
        </div>

        <div class="modal-footer">
          <button
            type="submit"
            [disabled]="poslovniPartnerForm.pristine"
            class="btn btn-outline-success"
          >
            Kreiraj
          </button>

          <button
            type="button"
            class="btn btn-outline-dark"
            (click)="activeModal.close('Close click')"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  `,
})
export class NgbdModalPoslovniPartnerCreate implements OnInit {
  poslovniPartnerForm: FormGroup;
  mesta: Mesto[] = [];
  mesto;
  createPP: PoslovniPartner = new PoslovniPartner();


  @Input() listaPP;
  constructor(
    public activeModal: NgbActiveModal,
    private poslovniPartnerService: PoslovniPartneriService,
    private mestoService: MestoService,


  ) {
    this.poslovniPartnerForm = this.createFormGroup();
  }

  ngOnInit() {
    this.mestoService.getAll().subscribe((response) => {
      this.mesta = response;
    });

  }

  createFormGroup() {
    return new FormGroup({
      nazivPartnera: new FormControl(),
      pib: new FormControl(),
      adresaPoslovnogPartnera: new FormControl(),
    });
  }


  onSubmitPartnerCreate() {
    this.createPP.mesto = this.mesto;
    this.createPP.nazivPartnera = this.poslovniPartnerForm.value.nazivPartnera;
    this.createPP.pib = this.poslovniPartnerForm.value.pib;
    this.createPP.adresaPoslovnogPartnera = this.poslovniPartnerForm.value.adresaPoslovnogPartnera;
    console.log(this.createPP.adresaPoslovnogPartnera)
    this.activeModal.close(this.createPP);
    // this.poslovniPartnerService.createPartner(this.magacinForm.value.nazivMagacina)
  }
}

@Component({
  selector: "app-poslovni-partneri",
  templateUrl: "./poslovni-partneri.component.html",
  styleUrls: ["./poslovni-partneri.component.scss"],
})
export class PoslovniPartneriComponent implements OnInit {
  poslovniPartneri$: Observable<PoslovniPartner[]>;
  partner: PoslovniPartner = new PoslovniPartner();
  showAdminOptions = false;
  $partnersChange = new Subject<any>();

  constructor(
    private poslovniPartnerService: PoslovniPartneriService,
    private modalService: NgbModal,
    private tokenStorageService :TokenStorageService
  ) {}

  ngOnInit(): void {
    this.poslovniPartneri$ = this.poslovniPartnerService.getAll();
    this.showAdminOptions = this.tokenStorageService
    .getUser()
    .roles.includes("ROLE_ADMIN");
  }

  setPartner(p) {
    this.partner = p;
  }

  openPoslovniPartnerModal() {
    const modalRef = this.modalService.open(NgbdModalPoslovniPartnerCreate, {
      size: "xl",
    });
    modalRef.result.then((receivedPartner) => {

      //this.poslovniPartneri$.subscribe(data => data.push(receivedPartner))
      // this.poslovniPartneri$.pipe(map(poslovniList => {
      //   poslovniList.push(receivedPartner)
      //   console.log(poslovniList)
      //   return poslovniList;

      // }))
    })


  }

  removePoslovniPartner(p){

  }
}
