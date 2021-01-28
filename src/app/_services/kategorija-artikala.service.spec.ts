import { TestBed } from '@angular/core/testing';

import { KategorijaArtikalaService } from './kategorija-artikala.service';

describe('KategorijaArtikalaService', () => {
  let service: KategorijaArtikalaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KategorijaArtikalaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
