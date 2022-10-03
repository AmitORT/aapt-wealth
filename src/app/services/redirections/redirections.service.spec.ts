import { TestBed } from '@angular/core/testing';

import { RedirectionsService } from './redirections.service';

describe('RedirectionsService', () => {
  let service: RedirectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedirectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
