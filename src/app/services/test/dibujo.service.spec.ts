import { TestBed } from '@angular/core/testing';

import { DibujoService } from './dibujo.service';

describe('DibujoService', () => {
  let service: DibujoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DibujoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
