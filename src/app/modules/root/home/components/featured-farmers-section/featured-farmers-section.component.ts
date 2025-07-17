import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ButtonModule } from 'primeng/button';

interface IFarmer {
  img: string;
  name: string;
  rating: number;
  location: string;
  farmName: string;
  productCount: number;
}

@Component({
  selector: 'app-featured-farmers-section',
  imports: [CommonModule, ButtonModule],
  templateUrl: './featured-farmers-section.component.html',
  styleUrl: './featured-farmers-section.component.scss',
})
export class FeaturedFarmersSectionComponent {
  public farmers: IFarmer[] = [
    {
      img: 'https://v0-georgia-e-commerce-platform.vercel.app/placeholder.svg',
      name: 'John Doe',
      location: 'Kakheti, Georgia',
      rating: 4.8,
      productCount: 12,
      farmName: 'Sunny Fields Farm',
    },
    {
      img: 'https://v0-georgia-e-commerce-platform.vercel.app/placeholder.svg',
      name: 'Nino Beridze',
      location: 'Imereti, Georgia',
      rating: 4.6,
      productCount: 8,
      farmName: 'Green Valley Farm',
    },
    {
      img: 'https://v0-georgia-e-commerce-platform.vercel.app/placeholder.svg',
      name: 'Giorgi Lomidze',
      location: 'Samegrelo, Georgia',
      rating: 4.9,
      productCount: 15,
      farmName: 'Riverbank Farm',
    },
    {
      img: 'https://v0-georgia-e-commerce-platform.vercel.app/placeholder.svg',
      name: 'Mariam Kapanadze',
      location: 'Adjara, Georgia',
      rating: 4.7,
      productCount: 10,
      farmName: 'Mountain View Farm',
    },
  ];
}
