import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { ValidationService } from '../../services/validation.service';
import { AuthService } from '../../services/auth.service';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class CustomerUpdateComponent implements OnInit {
  updateForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  success = '';
  customerId = '';
  currentUser: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
    private validationService: ValidationService,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      customerId: ['', [Validators.required]],
      fullName: [''],
      email: [''],
      password: [''],
      address: [''],
      contactNumber: [''],
    });
  }

  get f() {
    return this.updateForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';
    this.success = '';

    if (this.updateForm.invalid) {
      return;
    }

    // Validate individual fields if provided
    if (
      this.f['email'].value &&
      !this.validationService.validateEmail(this.f['email'].value)
    ) {
      this.error = 'Invalid email format';
      return;
    }

    if (
      this.f['password'].value &&
      !this.validationService.validatePassword(this.f['password'].value)
    ) {
      this.error =
        'Password must be at least 8 characters with uppercase, lowercase, digit and special character';
      return;
    }

    if (
      this.f['contactNumber'].value &&
      !this.validationService.validatePhone(this.f['contactNumber'].value)
    ) {
      this.error = 'Contact number must be exactly 10 digits';
      return;
    }

    this.loading = true;
    const customerId = this.f['customerId'].value;

    const updateData: any = {};
    if (this.f['fullName'].value)
      updateData.fullName = this.validationService.sanitizeInput(
        this.f['fullName'].value
      );
    if (this.f['email'].value)
      updateData.email = this.validationService.sanitizeInput(
        this.f['email'].value
      );
    if (this.f['password'].value)
      updateData.password = this.f['password'].value;
    if (this.f['address'].value)
      updateData.address = this.validationService.sanitizeInput(
        this.f['address'].value
      );
    if (this.f['contactNumber'].value)
      updateData.contactNumber = this.f['contactNumber'].value;

    this.customerService.updateCustomer(customerId, updateData).subscribe({
      next: (response) => {
        if (response.success) {
          this.success = 'Customer details updated successfully!';
          this.updateForm.reset();
          this.submitted = false;
        } else {
          this.error = response.message || 'Update failed';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.error || 'Update failed. Please try again.';
        this.loading = false;
      },
    });
  }

  backToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
