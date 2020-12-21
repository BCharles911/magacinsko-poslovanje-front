import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardMagacionerComponent } from './board-magacioner.component';

describe('BoardMagacionerComponent', () => {
  let component: BoardMagacionerComponent;
  let fixture: ComponentFixture<BoardMagacionerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardMagacionerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardMagacionerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
