import { TestBed } from '@angular/core/testing';

import { AescryptoService } from './aescrypto.service';

describe('AescryptoService', () => {
  let service: AescryptoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AescryptoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
