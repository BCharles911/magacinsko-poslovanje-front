import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagacinskeKarticeComponent } from './magacinske-kartice.component';

describe('MagacinskeKarticeComponent', () => {
  let component: MagacinskeKarticeComponent;
  let fixture: ComponentFixture<MagacinskeKarticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagacinskeKarticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagacinskeKarticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
