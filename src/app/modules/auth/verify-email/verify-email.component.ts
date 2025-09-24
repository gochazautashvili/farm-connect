import { ToastNotificationService } from '@shared/services/toast-notification.service';
import { Component, inject } from '@angular/core';
import { InputOtpModule } from 'primeng/inputotp';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

import { VerifyEmailService } from './services/verify-email.service';

@Component({
  standalone: true,
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
  imports: [CommonModule, FormsModule, InputOtpModule, ButtonModule],
})
export default class EmailVerifyComponent {
  private verifyEmailService = inject(VerifyEmailService);
  private toastService = inject(ToastNotificationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public isLoading = false;
  public code = '';

  onVerify() {
    if (this.code.length !== 6) return;

    this.isLoading = true;

    const email = this.route.snapshot.queryParams['email'];

    this.verifyEmailService.verify({ code: this.code, email }).subscribe({
      next: () => {
        this.isLoading = false;

        this.toastService.showSuccess(
          'თქვენამ ელ.ფოსტამ წარმატებით გაიარა ვერიფიკაცია.'
        );

        this.router.navigateByUrl('/auth/login');
      },
      error: () => (this.isLoading = false),
    });
  }
}
