import { TestBed } from '@angular/core/testing';

import { MagaciniService } from './magacini.service';

describe('MagaciniService', () => {
  let service: MagaciniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagaciniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
