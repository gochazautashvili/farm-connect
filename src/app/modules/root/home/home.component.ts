import { Component } from '@angular/core';

import { ButtonModule } from 'primeng/button';

import { CategoriesSectionComponent } from './components/categories-section/categories-section.component';

@Component({
  selector: 'app-home',
  imports: [ButtonModule, CategoriesSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {}
