import { JedinicaMere } from './../_model/JedinicaMere';
import { KategorijaArtikala } from './../_model/KategorijaArtikala';
import { KategorijaArtikalaService } from './../_services/kategorija-artikala.service';
import { JediniceMereService } from './../_services/jedinice-mere.service';
import { ConfirmationModuleComponent } from './../_reusables/confirmation-module/confirmation-module.component';
import { FormControl } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { ArtikliService } from "./../_services/artikli.service";
import { TokenStorageService } from "./../_services/token-storage.service";
import { Component, OnInit } from "@angular/core";
import { Artikal } from "../_model/Artikal";

@Component({
  selector: "ngbd-modal-content",
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Novi artikal</h4>
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
      <form
        [formGroup]="artikalForm"
        (ngSubmit)="onSubmitCreateArtikal()"
        novalidate
      >
        <div class="form-group">
          <label for="nazivArtikla">Artikal</label>
          <input
            type="text"
            formControlName="nazivArtikla"
            class="form-control"
            id="nazivArtikla"
            placeholder="Naziv artikla"
          />
        </div>

        <div class="form-group">
        <label class="input-field-label" for="roleSelect"
                >Jedinica mere</label
              >
              <select
                formControlName="jedinicaMere"
                class="form-control form-control-sm"
                name="jedinicaMere"
                id="jedinicaMereSelect"

              >
                <option *ngFor="let jedinicaMere of jediniceMere" [ngValue]="jedinicaMere">
                  {{jedinicaMere.nazivJediniceMere}}
                </option>

              </select>
        </div>

        <div class="form-group">
        <label class="input-field-label" for="roleSelect"
                >Kategorija artikla</label
              >
              <select
                formControlName="kategorijaArtikala"
                class="form-control form-control-sm"
                name="kategorijaArtikala"
                id="kategorijaArtikala"


              >
                <option *ngFor="let kategorijaArtikala of kategorijeArtikala" [ngValue]="kategorijaArtikala">
                  {{kategorijaArtikala.nazivKategorije}}
                </option>

              </select>
        </div>

        <div class="modal-footer">
          <button
            type="submit"
            [disabled]="artikalForm.pristine"
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
export class NgbdArtikalCreateModal implements OnInit {
  artikalForm: FormGroup;
  jediniceMere;
  kategorijeArtikala;


  constructor(
    public activeModal: NgbActiveModal,
    private artikalService: ArtikliService,
    private jedinicaMereService : JediniceMereService,
    private kategorijaService : KategorijaArtikalaService
  ) {
    this.artikalForm = this.createFormGroup();
  }

  ngOnInit(): void {
    this.jedinicaMereService.getAll().subscribe((response) => this.jediniceMere = response)
    this.kategorijaService.getAll().subscribe((response) => { this.kategorijeArtikala = response});
  }

  createFormGroup() {
    return new FormGroup({
      nazivArtikla: new FormControl(),
      jedinicaMere: new FormControl(),
      kategorijaArtikala: new FormControl()
    });
  }

  onSubmitCreateArtikal() {
    console.log(this.artikalForm.value.jedinicaMere);
    console.log(this.artikalForm.value.kategorijaArtikala);
    let artikalToCreate: Artikal = new Artikal();
    artikalToCreate.nazivArtikla = this.artikalForm.value.nazivArtikla;
    artikalToCreate.jedinicaMere = this.artikalForm.value.jedinicaMere;
    artikalToCreate.kategorijaArtikala = this.artikalForm.value.kategorijaArtikala;
    console.log(artikalToCreate)
    this.artikalService.createArtikal(artikalToCreate).subscribe((response) => {
      console.log(response)
      this.activeModal.close();
      window.location.reload();
    });
  }
}

@Component({
  selector: "app-artikli",
  templateUrl: "./artikli.component.html",
  styleUrls: ["./artikli.component.scss"],
})
export class ArtikliComponent implements OnInit {
  showAdminOptions = false;
  artikli;
  page = 1;
  pageSize = 5;
  collectionSize = 10;
  isDisabled = true;
  artikal: Artikal = new Artikal();
  jediniceMere: JedinicaMere[];
  kategorijeArtikala: KategorijaArtikala[];

  constructor(
    private tokenStorageService: TokenStorageService,
    private artikliService: ArtikliService,
    private modalService : NgbModal,
    private jedinicaMereService : JediniceMereService,
    private kategorijaArtikalaService: KategorijaArtikalaService
  ) {}

  ngOnInit(): void {
    this.showAdminOptions = this.tokenStorageService
      .getUser()
      .roles.includes("ROLE_ADMIN");
    this.artikliService.getAllArtikle().subscribe(response => this.artikli = response);
    this.jedinicaMereService.getAll().subscribe(response => {
      this.jediniceMere = response;
      console.log(response)
    })
    this.kategorijaArtikalaService.getAll().subscribe(response => this.kategorijeArtikala = response)
  }

  compareFn(c1: JedinicaMere, c2: JedinicaMere): boolean {
    return c1 && c2 ? c1.idJedMere === c2.idJedMere : c1 === c2;
  }

  openArtikal() {
    const modalRef = this.modalService.open(NgbdArtikalCreateModal, {size: 'xl'})
  }



  deleteArtikal(artikal) {
    const modalRef = this.modalService.open(ConfirmationModuleComponent);
    modalRef.result.then((result) => {
      if(result == true){
        this.artikliService.deleteArtikal(artikal).subscribe(
          (response) => {
            const index: number = this.artikli.indexOf(artikal);
            if(index !== -1){
              this.artikli.splice(index,1);
            }
          }
        )
      }else{
        return;
      }
    })



  }

  setArtikal(a){
    this.artikal = a
  }

  enableEdit(){
    this.isDisabled = !this.isDisabled;
    console.log(this.isDisabled)
    console.log(this.artikal)
  }

  onSubmitEdit(){
    this.artikliService.update(this.artikal).subscribe(
      data => {
        console.log(data)
      },
      err => {
        console.log(err.message)
      }
    )
  }
}
