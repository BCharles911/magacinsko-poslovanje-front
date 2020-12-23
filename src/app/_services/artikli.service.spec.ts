import { TestBed } from '@angular/core/testing';

import { ArtikliService } from './artikli.service';

describe('ArtikliService', () => {
  let service: ArtikliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtikliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
