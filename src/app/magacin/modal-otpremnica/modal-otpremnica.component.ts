import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-otpremnica',
  templateUrl: './modal-otpremnica.component.html',
  styleUrls: ['./modal-otpremnica.component.scss']
})
export class ModalOtpremnicaComponent implements OnInit {


  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
  }

}
