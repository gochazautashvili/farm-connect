import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

import { TranslationService } from '@core/i18n/translation.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private translationService: TranslationService) {
    this.translationService.loadLanguage();
  }
}
