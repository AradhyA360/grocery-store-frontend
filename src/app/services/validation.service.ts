import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  validateEmail(email: string): boolean {
    const emailPattern = /^[A-Za-z0-9+_.-]+@([A-Za-z0-9.-]+\.[A-Za-z]{2,})$/;
    return emailPattern.test(email);
  }

  validatePassword(password: string): boolean {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  }

  validatePhone(phone: string): boolean {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phone);
  }

  sanitizeInput(input: string): string {
    return input.trim().replace(/[<>"'%;()&+]/g, '');
  }
}
