import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';

import { Product } from '../../models';

@Component({
  standalone: true,
  selector: 'app-details-section',
  templateUrl: './details-section.component.html',
  styleUrls: ['./details-section.component.scss'],
  imports: [
    TagModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    RatingModule,
    InputNumberModule,
  ],
})
export class DetailsSectionComponent {
  @Input() product!: Product;
  @Input() quantity: number = 1;
  @Input() isWishlisted: boolean = false;

  @Output() quantityChange = new EventEmitter<number>();
  @Output() addToCart = new EventEmitter<void>();
  @Output() toggleWishlist = new EventEmitter<void>();
  @Output() share = new EventEmitter<void>();

  localQuantity: number = 1;

  ngOnInit() {
    this.localQuantity = this.quantity;
  }

  ngOnChanges() {
    this.localQuantity = this.quantity;
  }

  get totalPrice(): string {
    return (this.product.price * this.localQuantity).toFixed(2);
  }

  onQuantityChange(): void {
    this.quantityChange.emit(this.localQuantity);
  }

  getAvailabilitySeverity(): 'success' | 'warning' | 'danger' {
    if (this.product.availability === 'In Stock') return 'success';
    if (this.product.availability === 'Low Stock') return 'warning';
    return 'danger';
  }
}
