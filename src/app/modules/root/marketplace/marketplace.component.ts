import { Component } from '@angular/core';

import { ProductFilterComponent, ProductsComponent } from './components';

@Component({
  selector: 'app-marketplace',
  imports: [ProductFilterComponent, ProductsComponent],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.scss',
})
export default class MarketplaceComponent {}
