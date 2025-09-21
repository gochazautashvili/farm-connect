import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CheckboxModule } from 'primeng/checkbox';
import { SliderModule } from 'primeng/slider';

@Component({
  selector: 'app-product-filter',
  imports: [CommonModule, CheckboxModule, SliderModule, FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.scss',
})
export class ProductFilterComponent {
  public filter = {
    categories: [] as string[],
    price: [0, 1000],
    distance: 200,
  };

  public categories = [
    'Vegetables',
    'Fruits',
    'Dairy',
    'Bakery',
    'Meat',
    'Beverages',
  ];
}
