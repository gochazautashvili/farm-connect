import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

import { RegisterFormComponent } from './components';

@Component({
  selector: 'app-register',
  styleUrl: './register.component.scss',
  templateUrl: './register.component.html',
  imports: [CommonModule, RouterModule, RegisterFormComponent],
})
export default class RegisterComponent {}
