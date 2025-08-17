import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../services/auth/auth.service';
import { AuthCredentials } from '../../types/auth.interface';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  public form: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  public error = signal('');

  protected onSubmit(): void {
    if (this.form.invalid) return;

    const credentials: AuthCredentials = this.form.value;

    this.authService.login(credentials).subscribe({
      next: (): void => {
        this.router.navigate(['/todos']);
      },
      error: (err): void => {
        this.error = err.error?.message || 'Ошибка входа';
      }
    })
  }
}
