import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout.component'),
    children: [
      { path: '', loadComponent: () => import('./home/home.component') },
      {
        path: 'marketplace',
        loadComponent: () => import('./marketplace/marketplace.component'),
      },
      {
        path: 'product/:id',
        loadComponent: () =>
          import('./product-details/product-details.component'),
      },
    ],
  },
];

export default routes;
