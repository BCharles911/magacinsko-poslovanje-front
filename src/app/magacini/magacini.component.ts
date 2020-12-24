import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TokenStorageService } from "./../_services/token-storage.service";
import { MagaciniService } from "./../_services/magacini.service";
import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Magacin } from "../_model/Magacin";
import { ActivatedRoute } from "@angular/router";

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
      <form>
        <div class="form-group">
          <label for="nazivMagacina">Magacin</label>
          <input
            type="text"
            class="form-control"
            id="nazivMagacina"
            placeholder="Naziv magacina"
          />
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
      </form>
    </div>
  `,
})
export class NgbdModalContent {
  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: "app-magacini",
  templateUrl: "./magacini.component.html",
  styleUrls: ["./magacini.component.scss"],
})
export class MagaciniComponent implements OnInit {
  magacini$: Observable<Magacin[]>;
  selectedId: number;
  showAdminOptions = false;

  constructor(
    private magaciniService: MagaciniService,
    private route: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.showAdminOptions = this.tokenStorageService
      .getUser()
      .roles.includes("ROLE_ADMIN");
    this.magacini$ = this.magaciniService.getAll();
  }

  removeMagacin(m) {}

  openMagacin() {
    const modalRef = this.modalService.open(NgbdModalContent, { size: "xl" });
  }
}
