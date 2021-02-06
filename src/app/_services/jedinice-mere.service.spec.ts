import { TestBed } from '@angular/core/testing';

import { JediniceMereService } from './jedinice-mere.service';

describe('JediniceMereService', () => {
  let service: JediniceMereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JediniceMereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
