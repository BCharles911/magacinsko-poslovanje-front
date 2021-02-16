import { TestBed } from '@angular/core/testing';

import { PoslovnaGodinaService } from './poslovna-godina.service';

describe('PoslovnaGodinaService', () => {
  let service: PoslovnaGodinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoslovnaGodinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
