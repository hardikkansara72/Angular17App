import { TestBed } from '@angular/core/testing';

import { CustomerService } from './customer.service';
import { ApiService } from '../../core/service/api.service';
import { HttpClient, HttpHandler, HttpXhrBackend } from '@angular/common/http';

describe('CustomerService', () => {
  const httpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest()}));
  let api = new ApiService(httpClient)
  const service = new CustomerService(api);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[ApiService, HttpClient, HttpHandler]
    });
    service
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

// src/app/customer/services/customer.service.spec.ts