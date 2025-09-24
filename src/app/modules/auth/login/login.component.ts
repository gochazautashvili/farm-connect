import { Component, inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { LoginService } from './services/login.service';
import { AuthTokenService } from '@core/auth/services/auth-token.service';
import { AuthService } from '@core/auth/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    RouterModule,
    PasswordModule,
    DividerModule,
    ToastModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export default class LoginComponent implements OnInit {
  private tokenService = inject(AuthTokenService);
  private messageService = inject(MessageService);
  private loginService = inject(LoginService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  public form!: FormGroup;
  public isLoading = false;

  ngOnInit(): void {
    this.initializeForm();
  }

  public isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  public onSubmit() {
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      return;
    }

    this.isLoading = true;

    this.loginService
      .login(this.form.value)
      .subscribe({
        next: (res) => {
          this.form.reset();
          this.isLoading = false;

          this.authService.setUser(res.data.currentUser);

          this.tokenService.setTokens(res.data);

          this.messageService.add({
            severity: 'success',
            summary: 'წარმატება',
            detail: 'გილოცავთ თქვენ წარმატებით შეხვედით.',
          });

          this.router.navigateByUrl('/');
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          this.messageService.add({
            detail: err.error?.message || 'დაფიქსირდა შეცდომა',
            summary: 'წარუმატებლობა',
            severity: 'error',
          });

          if (err.status == 403) {
            this.router.navigateByUrl('/auth/send-email-verification');
          }
        },
      });
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
