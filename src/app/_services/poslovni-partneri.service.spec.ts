import { TestBed } from '@angular/core/testing';

import { PoslovniPartneriService } from './poslovni-partneri.service';

describe('PoslovniPartneriService', () => {
  let service: PoslovniPartneriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoslovniPartneriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
