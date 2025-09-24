import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastNotificationService {
  constructor(private messageService: MessageService) {}

  showError(detail: string, message?: string): void {
    this.messageService.add({
      summary: message || 'Error',
      severity: 'error',
      detail: detail,
      life: 5000,
    });
  }

  showSuccess(detail: string, message?: string): void {
    this.messageService.add({
      summary: message || 'Success',
      severity: 'success',
      detail: detail,
      life: 3000,
    });
  }

  showWarning(detail: string, message?: string): void {
    this.messageService.add({
      summary: message || 'Warning',
      severity: 'warn',
      detail: detail,
      life: 4000,
    });
  }

  showInfo(detail: string, message?: string): void {
    this.messageService.add({
      summary: message || 'Info',
      severity: 'info',
      detail: detail,
      life: 3000,
    });
  }

  clear(): void {
    this.messageService.clear();
  }
}
