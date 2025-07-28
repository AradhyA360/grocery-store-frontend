// customer-search.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { ValidationService } from '../../services/validation.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css'],
})
export class CustomerSearchComponent implements OnInit {
  searchForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  customers: Customer[] = [];
  showResults = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
    private validationService: ValidationService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      customerName: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  get f() {
    return this.searchForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';
    this.customers = [];
    this.showResults = false;

    if (this.searchForm.invalid) {
      return;
    }

    this.loading = true;
    const customerName = this.validationService.sanitizeInput(
      this.f['customerName'].value
    );

    this.customerService.searchCustomers(customerName).subscribe({
      next: (response) => {
        if (response.success) {
          this.customers = response.customers;
          this.showResults = true;
        } else {
          this.error = response.message || 'Search failed';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.error || 'Customer not found';
        this.loading = false;
      },
    });
  }

  backToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
