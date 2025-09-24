import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

import { ToastNotificationService } from '@shared/services/toast-notification.service';

export const globalErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastNotificationService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred!';
      let errorDetail = '';

      if (error.error instanceof ErrorEvent) {
        errorMessage = 'Connection Error';
        errorDetail = error.error.message;
      } else {
        switch (error.status) {
          case 0:
            errorMessage = 'Network Error';
            errorDetail =
              'Unable to connect to the server. Please check your internet connection.';
            break;
          case 400:
            errorMessage = 'Bad Request';
            errorDetail =
              error.error?.message || 'Please check your input and try again.';
            break;
          case 401:
            errorMessage = 'Unauthorized Access';
            errorDetail = 'Your session has expired. Please login again.';
            toastService.showError(errorDetail, errorMessage);
            return throwError(() => error);
          case 403:
            errorMessage = 'Access Forbidden';
            errorDetail = 'You do not have permission to access this resource.';
            break;
          case 404:
            errorMessage = 'Not Found';
            errorDetail = 'The requested resource was not found.';
            break;
          case 422:
            errorMessage = 'Validation Error';
            errorDetail =
              error.error?.message ||
              'Please correct the errors and try again.';
            break;
          case 500:
            errorMessage = 'Server Error';
            errorDetail = 'Internal server error. Please try again later.';
            break;
          case 502:
            errorMessage = 'Bad Gateway';
            errorDetail =
              'Server is temporarily unavailable. Please try again later.';
            break;
          case 503:
            errorMessage = 'Service Unavailable';
            errorDetail =
              'Service is temporarily unavailable. Please try again later.';
            break;
          case 504:
            errorMessage = 'Gateway Timeout';
            errorDetail = 'Request timed out. Please try again.';
            break;
          default:
            errorMessage = `Error ${error.status}`;
            errorDetail = error.message || 'An unexpected error occurred.';
        }
      }

      toastService.showError(errorDetail, errorMessage);

      return throwError(() => error);
    })
  );
};
