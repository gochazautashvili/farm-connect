import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

import { DeliveryInfo } from '../../models';

@Component({
  standalone: true,
  imports: [CommonModule, CardModule],
  selector: 'app-delivery-information',
  templateUrl: './delivery-information.component.html',
  styleUrls: ['./delivery-information.component.scss'],
})
export class DeliveryInformationComponent {
  @Input() deliveryInfo!: DeliveryInfo;
}
