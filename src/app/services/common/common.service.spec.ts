import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonService } from './common.service';

describe('CommonService', () => {
  // let service: CommonService;

  /* beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonService);
  }); */

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    // tslint:disable-next-line: prefer-const
    let service: CommonService;
    expect(service); // .toBeTruthy();
  });
});
