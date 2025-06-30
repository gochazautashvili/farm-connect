import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-navbar',
  imports: [AvatarModule, RouterModule, InputIcon, IconField, InputTextModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {}
