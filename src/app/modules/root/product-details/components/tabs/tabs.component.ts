import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabViewModule } from 'primeng/tabview';
import { AvatarModule } from 'primeng/avatar';
import { RatingModule } from 'primeng/rating';
import { CardModule } from 'primeng/card';

import { Product, Review } from '../../models';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TabViewModule,
    CardModule,
    RatingModule,
    AvatarModule,
  ],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  @Input() product!: Product;
  @Input() reviews: Review[] = [];

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}
