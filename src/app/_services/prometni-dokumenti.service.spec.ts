import { TestBed } from '@angular/core/testing';

import { PrometniDokumentiService } from './prometni-dokumenti.service';

describe('PrometniDokumentiService', () => {
  let service: PrometniDokumentiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrometniDokumentiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
