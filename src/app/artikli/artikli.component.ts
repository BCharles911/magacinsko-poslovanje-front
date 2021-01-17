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
export class NgbdArtikalCreateModal {
  artikalForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private artikalService: ArtikliService
  ) {
    this.artikalForm = this.createFormGroup();
  }

  createFormGroup() {
    return new FormGroup({
      nazivArtikla: new FormControl(),
    });
  }

  onSubmitCreateArtikal() {
    let artikalToCreate: Artikal = new Artikal();
    this.artikalService.createArtikal(artikalToCreate);
  }
}

@Component({
  selector: "app-artikli",
  templateUrl: "./artikli.component.html",
  styleUrls: ["./artikli.component.scss"],
})
export class ArtikliComponent implements OnInit {
  showAdminOptions = false;
  artikli$;

  constructor(
    private tokenStorageService: TokenStorageService,
    private artikliService: ArtikliService,
    private modalService : NgbModal
  ) {}

  ngOnInit(): void {
    this.showAdminOptions = this.tokenStorageService
      .getUser()
      .roles.includes("ROLE_ADMIN");
    this.artikliService.getAllArtikle().subscribe(response => this.artikli$ = response);
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
            const index: number = this.artikli$.indexOf(artikal);
            if(index !== -1){
              this.artikli$.splice(index,1);
            }
          }
        )
      }else{
        return;
      }
    })



  }
}
