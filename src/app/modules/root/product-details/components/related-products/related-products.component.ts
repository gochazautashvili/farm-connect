import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';

import { RelatedProduct } from '../../models';

@Component({
  standalone: true,
  selector: 'app-related-products',
  imports: [CommonModule, CardModule, RouterModule],
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.scss'],
})
export class RelatedProductsComponent {
  @Input() products: RelatedProduct[] = [];
}
