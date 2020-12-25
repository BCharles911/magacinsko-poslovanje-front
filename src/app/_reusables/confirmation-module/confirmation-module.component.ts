import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-module',
  templateUrl: './confirmation-module.component.html',
  styleUrls: ['./confirmation-module.component.scss']
})
export class ConfirmationModuleComponent implements OnInit {



  constructor(public activeModal : NgbActiveModal) { }

  ngOnInit(): void {
  }

  confirm(del){
    this.activeModal.close(del);
  }

  revert(del){
    this.activeModal.close(del);
  }


}
