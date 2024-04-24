import { TestBed } from '@angular/core/testing';

import { LoginSingupService } from './login-singup.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('LoginSingupService', () => {
  let service: LoginSingupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[HttpClient, HttpHandler]
    });
    service = TestBed.inject(LoginSingupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
