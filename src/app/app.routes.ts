import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomerRegistrationComponent } from './components/customer-registration/customer-registration.component';
import { CustomerUpdateComponent } from './components/customer-update/customer-update.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { CustomerSearchComponent } from './components/customer-search/customer-search.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ProductRegistrationComponent } from './components/product-registration/product-registration.component';
import { ProductUpdateComponent } from './components/product-update/product-update.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'customer-registration', component: CustomerRegistrationComponent },
  {
    path: 'customer-update',
    component: CustomerUpdateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order-history',
    component: OrderHistoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customer-search',
    component: CustomerSearchComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'product-search',
    component: ProductSearchComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product-registration',
    component: ProductRegistrationComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'product-update',
    component: ProductUpdateComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  { path: '**', redirectTo: '/login' },
];
