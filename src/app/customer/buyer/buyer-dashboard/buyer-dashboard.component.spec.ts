import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerDashboardComponent } from './buyer-dashboard.component';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('BuyerDashboardComponent', () => {
  let component: BuyerDashboardComponent;
  let fixture: ComponentFixture<BuyerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerDashboardComponent],
      providers: [CustomerService, HttpClient, HttpHandler]

    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
