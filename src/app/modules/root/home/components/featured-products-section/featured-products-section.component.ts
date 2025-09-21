import { Component } from '@angular/core';

import { ButtonModule } from 'primeng/button';

import { ProductCardComponent } from '@shared/components/product-card/product-card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-featured-products-section',
  imports: [ButtonModule, ProductCardComponent, RouterModule],
  templateUrl: './featured-products-section.component.html',
  styleUrl: './featured-products-section.component.scss',
})
export class FeaturedProductsSectionComponent {}
