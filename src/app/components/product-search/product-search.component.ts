import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ValidationService } from '../../services/validation.service';
import { Product } from '../../models/product.model';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ProductSearchComponent implements OnInit {
  searchForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  products: Product[] = [];
  showResults = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private validationService: ValidationService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      productName: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  get f() {
    return this.searchForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';
    this.products = [];
    this.showResults = false;

    if (this.searchForm.invalid) {
      return;
    }

    this.loading = true;
    const productName = this.validationService.sanitizeInput(
      this.f['productName'].value
    );

    this.productService.searchProducts(productName).subscribe({
      next: (response) => {
        if (response.success) {
          this.products = response.products;
          this.showResults = true;
        } else {
          this.error = response.message || 'Search failed';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.error || 'Product not found';
        this.loading = false;
      },
    });
  }

  addToCart(product: Product): void {
    // Implement add to cart functionality
    alert(`${product.productName} added to cart!`);
  }

  backToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
