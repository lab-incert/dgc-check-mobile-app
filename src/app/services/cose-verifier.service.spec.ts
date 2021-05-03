import { TestBed } from '@angular/core/testing';

import { CoseVerifierService } from './cose-verifier.service';

describe('CoseVerifierService', () => {
  let service: CoseVerifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoseVerifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
