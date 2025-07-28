import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  registerProduct(product: Product): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, product);
  }

  updateProduct(productId: string, product: Partial<Product>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${productId}`, product);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${productId}`);
  }

  searchProducts(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search/${name}`);
  }

  getAllProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all`);
  }
}
