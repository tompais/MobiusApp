import { TestBed } from '@angular/core/testing';

import { OrientacionService } from './orientacion.service';

describe('OrientacionService', () => {
  let service: OrientacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrientacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
