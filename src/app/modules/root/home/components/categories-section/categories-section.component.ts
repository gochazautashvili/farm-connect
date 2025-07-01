import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

import { farmProductCategories } from '@shared/data/categories';

@Component({
  selector: 'app-categories-section',
  imports: [CommonModule, RouterModule],
  templateUrl: './categories-section.component.html',
  styleUrl: './categories-section.component.scss',
})
export class CategoriesSectionComponent {
  public categories = farmProductCategories;
}
