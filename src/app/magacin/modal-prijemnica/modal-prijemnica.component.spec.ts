import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPrijemnicaComponent } from './modal-prijemnica.component';

describe('ModalPrijemnicaComponent', () => {
  let component: ModalPrijemnicaComponent;
  let fixture: ComponentFixture<ModalPrijemnicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPrijemnicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPrijemnicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
