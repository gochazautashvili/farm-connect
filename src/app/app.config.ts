import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { MessageService } from 'primeng/api';
import Aura from '@primeng/themes/aura';

import { globalErrorInterceptor } from '@core/https/global-error.interceptor';
import { JwtAuthInterceptor } from '@core/auth/https/auth.interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    providePrimeNG({
      theme: { preset: Aura, options: { darkModeSelector: false } },
    }),

    provideHttpClient(
      withInterceptors([globalErrorInterceptor, JwtAuthInterceptor])
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideRouter(routes),

    MessageService,
  ],
};
