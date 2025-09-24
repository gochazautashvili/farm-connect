import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  };
}

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) return null;

    const cleanedValue = value.replace(/[\s\-\(\)]/g, '');

    const patterns = [
      /^\+\d{1,3}\d{7,14}$/,
      /^\d{7,15}$/,
      /^\d{10}$/,
      /^\d{8,12}$/,
    ];

    const isValid = patterns.some((pattern) => pattern.test(cleanedValue));
    const allSameDigit = /^(\d)\1+$/.test(cleanedValue);
    const hasMinimumLength = cleanedValue.length >= 7;
    if (!isValid || allSameDigit || !hasMinimumLength) {
      return { invalidPhone: true };
    }
    return null;
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
