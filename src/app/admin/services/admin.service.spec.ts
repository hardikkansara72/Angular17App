import { TestBed } from '@angular/core/testing';

import { AdminService } from './admin.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ApiService } from '../../core/service/api.service';

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[ApiService, HttpClient, HttpHandler]
    });
    service = TestBed.inject(AdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
