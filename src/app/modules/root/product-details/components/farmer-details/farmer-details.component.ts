import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

import { Farmer } from '../../models';

@Component({
  selector: 'app-farmer-details',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, AvatarModule, TagModule],
  templateUrl: './farmer-details.component.html',
  styleUrls: ['./farmer-details.component.scss'],
})
export class FarmerDetailsComponent {
  @Input() farmer!: Farmer;

  @Output() viewProfile = new EventEmitter<void>();
  @Output() messageFarmer = new EventEmitter<void>();
  @Output() quickMessage = new EventEmitter<void>();
}
