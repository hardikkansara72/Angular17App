import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDashboardComponent } from './seller-dashboard.component';
import { CustomerService } from '../../services/customer.service';
import { ApiService } from '../../../core/service/api.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('SellerDashboardComponent', () => {
  let component: SellerDashboardComponent;
  let fixture: ComponentFixture<SellerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerDashboardComponent],
      providers:[CustomerService, ApiService, HttpClient, HttpHandler]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
