import { TestBed } from '@angular/core/testing';

import { RepeticionService } from './repeticion.service';

describe('RepeticionService', () => {
  let service: RepeticionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepeticionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
