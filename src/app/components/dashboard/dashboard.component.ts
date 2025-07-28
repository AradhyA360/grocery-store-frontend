import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class DashboardComponent implements OnInit {
  currentUser!: User;
  selectedOption: number = 0;
  showInvalidOptionMessage = false;

  constructor(private router: Router, private authService: AuthService) {
    this.currentUser = this.authService.currentUserValue!;
  }

  ngOnInit(): void {}

  selectOption(option: number): void {
    this.showInvalidOptionMessage = false;

    if (option < 1 || option > 9) {
      this.showInvalidOptionMessage = true;
      return;
    }

    this.selectedOption = option;

    switch (option) {
      case 1:
        this.router.navigate(['/customer-registration']);
        break;
      case 2:
        this.router.navigate(['/customer-update']);
        break;
      case 3:
        this.router.navigate(['/order-history']);
        break;
      case 4:
        if (this.currentUser.role === 'ADMIN') {
          this.router.navigate(['/customer-search']);
        } else {
          this.showInvalidOptionMessage = true;
        }
        break;
      case 5:
        this.router.navigate(['/product-search']);
        break;
      case 6:
        if (this.currentUser.role === 'ADMIN') {
          this.router.navigate(['/product-registration']);
        } else {
          this.showInvalidOptionMessage = true;
        }
        break;
      case 7:
        if (this.currentUser.role === 'ADMIN') {
          this.router.navigate(['/product-update']);
        } else {
          this.showInvalidOptionMessage = true;
        }
        break;
      case 8:
        if (this.currentUser.role === 'ADMIN') {
          this.router.navigate(['/product-delete']);
        } else {
          this.showInvalidOptionMessage = true;
        }
        break;
      case 9:
        this.logout();
        break;
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (response) => {
        alert(response.message);
        this.router.navigate(['/login']);
      },
    });
  }

  isAdmin(): boolean {
    return this.currentUser.role === 'ADMIN';
  }
}
