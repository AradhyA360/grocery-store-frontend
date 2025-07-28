import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-product-registration',
  templateUrl: './product-registration.component.html',
  styleUrls: ['./product-registration.component.css'],
})
export class ProductRegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  success = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private validationService: ValidationService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      productName: ['', [Validators.required, Validators.minLength(2)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
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

    if (this.f['price'].value <= 0) {
      this.error = 'Price must be positive';
      return;
    }

    if (this.f['quantity'].value < 0) {
      this.error = 'Quantity cannot be negative';
      return;
    }

    this.loading = true;

    const product = {
      productName: this.validationService.sanitizeInput(
        this.f['productName'].value
      ),
      price: parseFloat(this.f['price'].value),
      quantity: parseInt(this.f['quantity'].value),
    };

    this.productService.registerProduct(product).subscribe({
      next: (response) => {
        if (response.success) {
          this.success = `Product registered successfully! Product ID: ${response.productId}`;
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
