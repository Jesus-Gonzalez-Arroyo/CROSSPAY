import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Auth } from '../../core/services/auth/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: Auth, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * Maneja el envío del formulario de login por medio del sevicio Auth
   */

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
          
      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/panel/administracion']);
        },
        error: (error) => {
          Swal.fire({
            title: 'Error',
            text: 'Ha ocurrido un error durante el login. Por favor, verifica tus credenciales e intenta de nuevo.',
            icon: 'error'
          });
          console.error('Error login:', error);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
