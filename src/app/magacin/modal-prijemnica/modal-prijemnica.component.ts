import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-prijemnica',
  templateUrl: './modal-prijemnica.component.html',
  styleUrls: ['./modal-prijemnica.component.scss']
})
export class ModalPrijemnicaComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
