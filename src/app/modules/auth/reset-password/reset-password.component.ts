import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';

import { passwordMatchValidator } from '../register/validators';
import { ResetPasswordService } from './services/reset-password.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    ButtonModule,
    PasswordModule,
    ReactiveFormsModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export default class ResetPasswordComponent implements OnInit {
  private resetPasswordService = inject(ResetPasswordService);
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public resetToken: string = '';
  public showSuccess = false;
  public errorMessage = '';
  public isLoading = false;
  public form!: FormGroup;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.resetToken = params['token'] || '';
      if (!this.resetToken) {
        this.errorMessage = 'Invalid or missing reset token';
      }
    });

    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordMatchValidator }
    );
  }

  public isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      return;
    }

    if (!this.resetToken) {
      this.errorMessage =
        'Invalid reset token. Please request a new password reset.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.showSuccess = false;

    this.resetPasswordService
      .reset({
        token: this.resetToken,
        newPassword: this.form.get('password')?.value,
        confirmPassword: this.form.get('confirmPassword')?.value,
      })
      .subscribe({
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          this.showSuccess = false;
          this.errorMessage = err.error?.message || err.message;
        },
        next: () => {
          this.errorMessage = '';
          this.isLoading = false;
          this.showSuccess = true;

          this.router.navigateByUrl('/auth/login');
        },
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
