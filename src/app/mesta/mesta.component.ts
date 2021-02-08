import { ConfirmationModuleComponent } from './../_reusables/confirmation-module/confirmation-module.component';
import { Mesto } from './../_model/Mesto';
import { FormControl } from '@angular/forms';
import { TokenStorageService } from './../_services/token-storage.service';
import { MestoService } from './../_services/mesto.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: "ngbd-modal-content",
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Novi magacin</h4>
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

      <form [formGroup]="mestoForm" (ngSubmit)="onSubmitCreateMesto()" novalidate>

        <div class="form-group">
          <label for="nazivMesta">Naziv mesta</label>
          <input
            type="text"
            formControlName = "nazivMesta"
            class="form-control"
            id="nazivMesta"
            placeholder="Naziv mesta"
          />
        </div>
        <div class="form-group">
          <label for="drzava">Drzava</label>
          <input
            type="text"
            formControlName = "drzava"
            class="form-control"
            id="drzava"
            placeholder="Drzava"
          />
        </div>
        <div class="form-group">
          <label for="postanskiBroj">Postanski broj</label>
          <input
            type="text"
            formControlName = "postanskiBroj"
            class="form-control"
            id="postanskiBroj"
            placeholder="postanski broj"
          />
        </div>

        <div class="modal-footer">
           <button
            type="submit"
            [disabled]="mestoForm.pristine"
            class="btn btn-outline-success" >
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
export class NgbdModalMestoCreate {

  mestoForm: FormGroup;
  createMesto: Mesto = new Mesto();

  constructor(public activeModal: NgbActiveModal, private mestoService : MestoService) {
    this.mestoForm = this.createFormGroup();
  }


  createFormGroup(){
    return new FormGroup({
      nazivMesta: new FormControl(),
      postanskiBroj: new FormControl(),
      drzava: new FormControl()
    })
  }

  onSubmitCreateMesto(){
    this.createMesto.nazivMesta = this.mestoForm.value.nazivMesta;
    this.createMesto.postanskiBroj = this.mestoForm.value.postanskiBroj;
    this.createMesto.drzava = this.mestoForm.value.drzava;
    this.activeModal.close(this.createMesto);
    this.mestoService.createMesto(this.createMesto).subscribe(
      response => console.log(response)
    )


  }
}

@Component({
  selector: 'app-mesta',
  templateUrl: './mesta.component.html',
  styleUrls: ['./mesta.component.scss']
})
export class MestaComponent implements OnInit {

  page = 1;
  pageSize = 4;
  collectionSize = 10;
  mesta;
  showAdminOptions = false;

  constructor(private mestoService : MestoService,private modalService: NgbModal, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.showAdminOptions = this.tokenStorageService
    .getUser()
    .roles.includes("ROLE_ADMIN");

    this.mestoService.getAll().subscribe(response => this.mesta = response)
  }

  removeMesto(m){
    const modalRef = this.modalService.open(ConfirmationModuleComponent);
    modalRef.result.then((result) => {
      if ( result === true) {
        this.mestoService.deleteMesto(m).subscribe((response) => {
          const index: number = this.mesta.indexOf(m);
          if(index !== -1){
            this.mesta.splice(index,1);
          }
        })
      }
    })

  }

  openMesto(){
    const modalRef = this.modalService.open(NgbdModalMestoCreate, {size : 'xl'});
    modalRef.result.then((receivedMesto) => {
      this.mesta.push(receivedMesto);
    })
  }




}
