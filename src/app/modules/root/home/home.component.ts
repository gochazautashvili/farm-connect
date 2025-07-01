import { Component } from '@angular/core';

import { ButtonModule } from 'primeng/button';

import { CategoriesSectionComponent } from './components/categories-section/categories-section.component';
import { FeaturedProductsSectionComponent } from "./components/featured-products-section/featured-products-section.component";
import { FeaturedFarmersSectionComponent } from "./components/featured-farmers-section/featured-farmers-section.component";

@Component({
  selector: 'app-home',
  imports: [ButtonModule, CategoriesSectionComponent, FeaturedProductsSectionComponent, FeaturedFarmersSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {}
