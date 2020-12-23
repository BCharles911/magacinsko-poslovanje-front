import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOtpremnicaComponent } from './modal-otpremnica.component';

describe('ModalOtpremnicaComponent', () => {
  let component: ModalOtpremnicaComponent;
  let fixture: ComponentFixture<ModalOtpremnicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalOtpremnicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOtpremnicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
