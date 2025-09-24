import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Component, inject } from '@angular/core';
import { SendEmailVerificationService } from './services/send-email-verification.service';
import { ToastNotificationService } from '@shared/services/toast-notification.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-send-email-verification',
  templateUrl: './send-email-verification.component.html',
  styleUrls: ['./send-email-verification.component.scss'],
  imports: [
    ToastModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
  ],
})
export default class SendEmailVerificationComponent {
  private sendEmailVerification = inject(SendEmailVerificationService);
  private toastService = inject(ToastNotificationService);
  private router = inject(Router);

  public email: string = '';
  public isLoading = false;

  public onSubmit() {
    if (!this.email) return;

    this.isLoading = true;

    this.sendEmailVerification.send(this.email)
    .subscribe({
      error: () => (this.isLoading = false),
      next: () => {
        this.toastService.showSuccess(
          'ვერიფიკაცია წარმატებით გაიგზავნა. შეამოწმეთ ელ.ფოსტა!'
        );

        this.router.navigateByUrl(`/auth/verify-email?email=${this.email}`);
      },
    });
  }
}
