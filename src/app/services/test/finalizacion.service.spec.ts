import { TestBed } from '@angular/core/testing';

import { FinalizacionService } from './finalizacion.service';

describe('FinalizacionService', () => {
  let service: FinalizacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinalizacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
