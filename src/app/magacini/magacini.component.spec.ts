import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagaciniComponent } from './magacini.component';

describe('MagaciniComponent', () => {
  let component: MagaciniComponent;
  let fixture: ComponentFixture<MagaciniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagaciniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagaciniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
