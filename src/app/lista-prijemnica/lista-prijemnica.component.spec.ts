import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPrijemnicaComponent } from './lista-prijemnica.component';

describe('ListaPrijemnicaComponent', () => {
  let component: ListaPrijemnicaComponent;
  let fixture: ComponentFixture<ListaPrijemnicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPrijemnicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPrijemnicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
