import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // for router-outlet
import { DashboardComponent } from './components/dashboard/dashboard.component'; // only if directly used in template

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // DashboardComponent can also be added if used
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'grocery-store-frontend';
}
