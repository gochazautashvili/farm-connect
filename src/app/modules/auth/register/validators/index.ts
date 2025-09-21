import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (!password || !confirmPassword) {
      return null;
    }
    
    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  };
}

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const phoneRegex = /^\+995\s?\d{3}\s?\d{3}\s?\d{3}$/;
    const value = control.value;
    
    if (!value) {
      return null;
    }
    
    return phoneRegex.test(value) ? null : { invalidPhone: true };
  };
}

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const value = control.value;
    
    if (!value) {
      return null;
    }
    
    return emailRegex.test(value) ? null : { invalidEmail: true };
  };
}

export function requiredIfValidator(condition: () => boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (condition() && !control.value) {
      return { required: true };
    }
    return null;
  };
}
