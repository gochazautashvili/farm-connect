import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

import { HttpErrorResponse } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { SendResetPasswordLinkService } from './services/send-reset-password-link.service';

@Component({
  selector: 'app-send-reset-password-link',
  imports: [
    RouterLink,
    ButtonModule,
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './send-reset-password-link.component.html',
  styleUrl: './send-reset-password-link.component.scss',
})
export default class SendResetPasswordLinkComponent {
  private sendResetPasswordLinkService = inject(SendResetPasswordLinkService);
  private formBuilder = inject(FormBuilder);

  public showSuccess = false;
  public errorMessage = '';
  public isLoading = false;
  public form!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.showSuccess = false;

    const email = this.form.get('email')?.value;

    this.sendResetPasswordLinkService
      .sendResetPasswordLink(email)
      .subscribe({
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error?.message || err.message;
          this.showSuccess = false;
          this.isLoading = false;
        },
        next: () => {
          this.isLoading = false;
          this.errorMessage = '';
          this.showSuccess = true;
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
