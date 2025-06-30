import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { InputIcon } from 'primeng/inputicon';
import { DrawerModule } from 'primeng/drawer';
import { IconField } from 'primeng/iconfield';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { PrimeIcons } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    InputIcon,
    IconField,
    AvatarModule,
    CommonModule,
    ButtonModule,
    RouterModule,
    DrawerModule,
    InputTextModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  public visible: boolean = false;

  public links = [
    {
      icon: PrimeIcons.HOME,
      label: 'Home',
      url: '',
    },
    {
      icon: PrimeIcons.SHOP,
      label: 'Marketplace',
      url: 'marketplace',
    },
    {
      icon: PrimeIcons.BOX,
      label: 'Orders',
      url: 'profile/orders',
    },
    {
      icon: PrimeIcons.HEART,
      label: 'Favorites',
      url: 'profile/favorites',
    },
    {
      icon: PrimeIcons.BELL,
      label: 'Notifications',
      url: 'profile/notifications',
    },
    {
      icon: PrimeIcons.COG,
      label: 'Settings',
      url: 'profile/settings',
    },
    {
      icon: PrimeIcons.QUESTION_CIRCLE,
      label: 'Help',
      url: 'help',
    },
  ];
}
