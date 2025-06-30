import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

import { MobileNavbarComponent } from './mobile-navbar/mobile-navbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    MobileNavbarComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export default class LayoutComponent {}
