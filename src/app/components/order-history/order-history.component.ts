// order-history.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Order } from '../../models/order.model';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class OrderHistoryComponent implements OnInit {
  searchForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  orders: Order[] = [];
  showResults = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      customerId: ['', [Validators.required, Validators.pattern('^\\d{6}')]],
    });
  }

  get f() {
    return this.searchForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';
    this.orders = [];
    this.showResults = false;

    if (this.searchForm.invalid) {
      return;
    }

    this.loading = true;
    const customerId = this.f['customerId'].value;

    this.customerService.getCustomerOrders(customerId).subscribe({
      next: (response) => {
        if (response.success) {
          this.orders = response.orders;
          this.showResults = true;
        } else {
          this.error = response.message || 'Failed to fetch orders';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error =
          err.error?.error || 'Customer not found or no orders available';
        this.loading = false;
      },
    });
  }

  backToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
