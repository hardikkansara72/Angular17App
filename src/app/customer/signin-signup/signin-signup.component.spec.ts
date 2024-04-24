import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninSignupComponent } from './signin-signup.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { LoginSingupService } from '../../shared/services/login-singup.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('SigninSignupComponent', () => {
  let component: SigninSignupComponent;
  let fixture: ComponentFixture<SigninSignupComponent>;
  const fakeActivatedRoute = {snapshot: { data: { } } } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigninSignupComponent],
      providers:[LoginSingupService, HttpClient, HttpHandler, {provide: ActivatedRoute, useValue: fakeActivatedRoute}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SigninSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SigninSignupComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
