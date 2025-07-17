import { Component } from '@angular/core';

import { FeaturedProductsSectionComponent } from './components/featured-products-section/featured-products-section.component';
import { FeaturedFarmersSectionComponent } from './components/featured-farmers-section/featured-farmers-section.component';
import { CategoriesSectionComponent } from './components/categories-section/categories-section.component';
import { RoadmapSectionComponent } from './components/roadmap-section/roadmap-section.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';

@Component({
  selector: 'app-home',
  imports: [
    FeaturedProductsSectionComponent,
    FeaturedFarmersSectionComponent,
    CategoriesSectionComponent,
    RoadmapSectionComponent,
    HeroSectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {}
