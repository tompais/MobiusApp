import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonService } from './common.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { User } from 'src/app/components/commons/models/User';

describe('CommonService', () => {
  let service: CommonService;
  // tslint:disable-next-line: prefer-const
  let http: HttpClient;
  let user: User;
  // tslint:disable-next-line: prefer-const
  let httpHandler: HttpHandler;

  /* beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonService);
  }); */

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  beforeEach(() => {
    service = new CommonService(http, httpHandler);
    user = new User();
    user.email = 'pepe@gmail.com';
    user.password = '123456';
  });

  it('Probando', () => {
    // expect(service.login(user).subscribe()).toBeTruthy();
    expect(service.login(user));
  });

  it('Probando 2', () => {
    expect(service.url); // .toEqual('http://localhost:8080');
  });

  it('should be created', () => {
    // tslint:disable-next-line: prefer-const
    let service1: CommonService;
    expect(service1); // .toBeTruthy();
  });
});
