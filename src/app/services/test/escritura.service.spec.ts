import { TestBed } from '@angular/core/testing';

import { EscrituraService } from './escritura.service';

describe('EscrituraService', () => {
  let service: EscrituraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EscrituraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
