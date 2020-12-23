import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoslovniPartneriComponent } from './poslovni-partneri.component';

describe('PoslovniPartneriComponent', () => {
  let component: PoslovniPartneriComponent;
  let fixture: ComponentFixture<PoslovniPartneriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoslovniPartneriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoslovniPartneriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
