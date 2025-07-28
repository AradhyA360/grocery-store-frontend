import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { ValidationService } from '../../services/validation.service';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class CustomerRegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  success = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
    private validationService: ValidationService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      contactNumber: [
        '',
        [Validators.required, Validators.pattern('^\\d{10}$')],
      ],
    });
  }

  get f() {
    return this.registrationForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';
    this.success = '';

    if (this.registrationForm.invalid) {
      return;
    }

    // Additional validation
    if (!this.validationService.validateEmail(this.f['email'].value)) {
      this.error = 'Invalid email format';
      return;
    }

    if (!this.validationService.validatePassword(this.f['password'].value)) {
      this.error =
        'Password must be at least 8 characters with uppercase, lowercase, digit and special character';
      return;
    }

    if (!this.validationService.validatePhone(this.f['contactNumber'].value)) {
      this.error = 'Contact number must be exactly 10 digits';
      return;
    }

    this.loading = true;

    const customer = {
      fullName: this.validationService.sanitizeInput(this.f['fullName'].value),
      email: this.validationService.sanitizeInput(this.f['email'].value),
      password: this.f['password'].value,
      address: this.validationService.sanitizeInput(this.f['address'].value),
      contactNumber: this.f['contactNumber'].value,
    };

    this.customerService.registerCustomer(customer).subscribe({
      next: (response) => {
        if (response.success) {
          this.success = `Customer registered successfully! Customer ID: ${response.customerId}`;
          this.registrationForm.reset();
          this.submitted = false;
        } else {
          this.error = response.message || 'Registration failed';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error =
          err.error?.error || 'Registration failed. Please try again.';
        this.loading = false;
      },
    });
  }

  backToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
