import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Auth } from '../../../core/services/auth/auth';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayout implements OnInit, OnDestroy {
  isAuthenticated = false;
  private authSubscription?: Subscription;

  constructor(private router: Router, private authService: Auth) {}

  ngOnInit(): void {
    this.authService.checkAuthStatus();
    
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuth: boolean) => {
        this.isAuthenticated = isAuth;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  closeSession() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
