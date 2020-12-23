import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrijemnicaComponent } from './prijemnica.component';

describe('PrijemnicaComponent', () => {
  let component: PrijemnicaComponent;
  let fixture: ComponentFixture<PrijemnicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrijemnicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrijemnicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
