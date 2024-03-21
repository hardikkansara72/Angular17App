import { TestBed } from '@angular/core/testing';

import { LoginSingupService } from './login-singup.service';

describe('LoginSingupService', () => {
  let service: LoginSingupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginSingupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
