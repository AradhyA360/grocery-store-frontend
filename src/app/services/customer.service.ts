import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:8080/api/customers';

  constructor(private http: HttpClient) {}

  registerCustomer(customer: Customer): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, customer);
  }

  updateCustomer(
    customerId: string,
    customer: Partial<Customer>
  ): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${customerId}`, customer);
  }

  getCustomerOrders(customerId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/orders/${customerId}`);
  }

  searchCustomers(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search/${name}`);
  }
}
