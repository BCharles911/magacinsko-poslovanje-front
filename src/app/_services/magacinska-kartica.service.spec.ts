import { TestBed } from '@angular/core/testing';

import { MagacinskaKarticaService } from './magacinska-kartica.service';

describe('MagacinskaKarticaService', () => {
  let service: MagacinskaKarticaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagacinskaKarticaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
