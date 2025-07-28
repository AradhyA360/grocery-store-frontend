// product-update.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
})
export class ProductUpdateComponent implements OnInit {
  updateForm!: FormGroup;
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
    this.updateForm = this.formBuilder.group({
      productId: ['', [Validators.required, Validators.pattern('^\\d{6}')]],
      productName: [''],
      price: [''],
      quantity: [''],
      reserved: [''],
      customerId: [''],
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
    if (this.f['price'].value && this.f['price'].value <= 0) {
      this.error = 'Price must be positive';
      return;
    }

    if (this.f['quantity'].value && this.f['quantity'].value < 0) {
      this.error = 'Quantity cannot be negative';
      return;
    }

    this.loading = true;
    const productId = this.f['productId'].value;

    const updateData: any = {};
    if (this.f['productName'].value)
      updateData.productName = this.validationService.sanitizeInput(
        this.f['productName'].value
      );
    if (this.f['price'].value)
      updateData.price = parseFloat(this.f['price'].value);
    if (this.f['quantity'].value)
      updateData.quantity = parseInt(this.f['quantity'].value);
    if (this.f['reserved'].value)
      updateData.reserved = parseInt(this.f['reserved'].value);
    if (this.f['customerId'].value)
      updateData.customerId = this.f['customerId'].value;

    this.productService.updateProduct(productId, updateData).subscribe({
      next: (response) => {
        if (response.success) {
          this.success = 'Product updated successfully!';
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

  deleteProduct(): void {
    if (!this.f['productId'].value) {
      this.error = 'Please enter Product ID first';
      return;
    }

    if (confirm('Are you sure you want to delete this product?')) {
      this.loading = true;
      const productId = this.f['productId'].value;

      this.productService.deleteProduct(productId).subscribe({
        next: (response) => {
          if (response.success) {
            this.success = 'Product deleted successfully!';
            this.updateForm.reset();
            this.submitted = false;
          } else {
            this.error = response.message || 'Delete failed';
          }
          this.loading = false;
        },
        error: (err) => {
          this.error = err.error?.error || 'Delete failed. Please try again.';
          this.loading = false;
        },
      });
    }
  }

  backToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
