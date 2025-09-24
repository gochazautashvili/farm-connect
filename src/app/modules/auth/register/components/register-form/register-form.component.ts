import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

import { Component, inject, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import {
  emailValidator,
  phoneValidator,
  passwordMatchValidator,
} from '../../validators';
import { RegisterService } from '../../services/register.service';
import { ToastNotificationService } from '@shared/services/toast-notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  styleUrl: './register-form.component.scss',
  templateUrl: './register-form.component.html',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
  ],
})
export class RegisterFormComponent {
  private _toastService = inject(ToastNotificationService);
  private _registerService = inject(RegisterService);
  private _router = inject(Router);

  public isLoading = signal(false);
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, emailValidator()]],
        phone: ['', [Validators.required, phoneValidator()]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: passwordMatchValidator() }
    );
  }

  public handleSubmit() {
    if (this.form.invalid) return;

    this.isLoading.set(true);

    this._registerService
      .register(this.form.value)
      .subscribe({
        next: () => {
          this.form.reset();
          this.isLoading.set(false);
          this._toastService.showSuccess(
            'გილოცავთ რეგისტრაცია წარმატებით დასრულდა, შეამოწმეთ ელ.ფორსტ!'
          );

          this._router.navigateByUrl('/auth/verify-email');
        },
        error: () => this.isLoading.set(false),
      });
  }
}
