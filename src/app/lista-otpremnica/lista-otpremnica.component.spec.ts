import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaOtpremnicaComponent } from './lista-otpremnica.component';

describe('ListaOtpremnicaComponent', () => {
  let component: ListaOtpremnicaComponent;
  let fixture: ComponentFixture<ListaOtpremnicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaOtpremnicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaOtpremnicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
