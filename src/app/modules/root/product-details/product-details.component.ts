import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { DeliveryInformationComponent } from './components/delivery-information/delivery-information.component';
import { RelatedProductsComponent } from './components/related-products/related-products.component';
import { DetailsSectionComponent } from './components/details-section/details-section.component';
import { FarmerDetailsComponent } from './components/farmer-details/farmer-details.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { TabsComponent } from './components/tabs/tabs.component';

import { Product, RelatedProduct, Review } from './models';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    ToastModule,
    TabsComponent,
    GalleryComponent,
    BreadcrumbModule,
    FarmerDetailsComponent,
    DetailsSectionComponent,
    RelatedProductsComponent,
    DeliveryInformationComponent,
  ],
  providers: [MessageService],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export default class ProductDetailComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  product!: Product;
  quantity: number = 1;
  reviews: Review[] = [];
  isWishlisted: boolean = false;
  relatedProducts: RelatedProduct[] = [];

  breadcrumbItems: MenuItem[] = [];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initializeSampleData();

    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const productId = params['id'];
      this.loadProduct(productId);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeSampleData(): void {
    // Sample product data with real images
    this.product = {
      id: 1,
      name: 'Organic Tomatoes',
      description:
        'Fresh, vine-ripened organic tomatoes grown in the fertile soils of Kakheti region. These tomatoes are carefully cultivated using traditional organic farming methods, ensuring the highest quality and taste.',
      longDescription:
        "Our organic tomatoes are grown in the heart of Georgia's wine country, where the Mediterranean climate and rich soil create perfect growing conditions. We use only natural fertilizers and pest control methods, ensuring that every tomato is not only delicious but also healthy for you and your family. Harvested at peak ripeness and delivered within 24 hours of picking.",
      price: 4.5,
      unit: 'kg',
      images: [
        'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=800&q=80',
        'https://images.unsplash.com/photo-1558818498-28c1e002b655?w=800&q=80', // Tomatoes close-up
        'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&q=80', // Organic tomatoes basket
        'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=800&q=80', // Tomatoes in field
      ],
      farmer: {
        id: 1,
        name: 'Giorgi Beridze',
        photo:
          'https://images.unsplash.com/photo-1549351512-c5e12b11e283?w=400&q=80', // Farmer portrait
        farmName: 'Beridze Organic Farm',
        location: 'Kakheti Region',
        distance: 5.2,
        rating: 4.8,
        reviewCount: 156,
        yearsExperience: 15,
        totalProducts: 24,
        followers: 342,
        isVerified: true,
        bio: 'Third-generation farmer specializing in organic vegetables and sustainable farming practices. Our family has been cultivating this land for over 50 years.',
      },
      rating: 4.8,
      reviewCount: 24,
      category: 'vegetables',
      isOrganic: true,
      availability: 'In Stock',
      stock: 45,
      nutritionInfo: {
        calories: 18,
        protein: 0.9,
        carbs: 3.9,
        fiber: 1.2,
        vitaminC: 14,
      },
      deliveryInfo: {
        estimatedDays: '1-2',
        freeShippingOver: 25,
        shippingCost: 3.5,
      },
    };

    this.reviews = [
      {
        id: 1,
        user: 'Tamar Gelashvili',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80', // Female avatar
        rating: 5,
        date: '2024-01-15',
        comment:
          'Absolutely amazing tomatoes! So fresh and flavorful. You can really taste the difference with organic produce. Will definitely order again!',
        images: [
          'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=400&q=80', // Tomato dish
          'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=400&q=80', // Sliced tomatoes
        ],
      },
      {
        id: 2,
        user: 'David Maisuradze',
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', // Male avatar
        rating: 5,
        date: '2024-01-10',
        comment:
          'Perfect for my restaurant. Consistent quality and always fresh. Giorgi is a reliable farmer and I highly recommend his products.',
        images: [],
      },
      {
        id: 3,
        user: 'Nino Kvaratskhelia',
        avatar:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', // Female avatar
        rating: 4,
        date: '2024-01-08',
        comment:
          'Great tomatoes, though delivery took a bit longer than expected. Still very satisfied with the quality and will order again.',
        images: [
          'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&q=80', // Tomato salad
        ],
      },
    ];

    this.relatedProducts = [
      {
        id: 2,
        name: 'Organic Cucumbers',
        price: 3.2,
        unit: 'kg',
        image:
          'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=600&q=80', // Fresh cucumbers
        farmer: 'Giorgi Beridze',
        rating: 4.7,
      },
      {
        id: 3,
        name: 'Fresh Bell Peppers',
        price: 5.8,
        unit: 'kg',
        image:
          'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&q=80', // Colorful bell peppers
        farmer: 'Giorgi Beridze',
        rating: 4.9,
      },
      {
        id: 4,
        name: 'Organic Lettuce',
        price: 2.5,
        unit: 'head',
        image:
          'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=600&q=80', // Fresh lettuce
        farmer: 'Nana Chkheidze',
        rating: 4.6,
      },
      {
        id: 5,
        name: 'Cherry Tomatoes',
        price: 6.0,
        unit: '500g',
        image:
          'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600&q=80', // Cherry tomatoes
        farmer: 'Levan Kvaratskhelia',
        rating: 4.8,
      },
      {
        id: 6,
        name: 'Fresh Carrots',
        price: 2.8,
        unit: 'kg',
        image:
          'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&q=80', // Fresh carrots
        farmer: 'Giorgi Beridze',
        rating: 4.7,
      },
      {
        id: 7,
        name: 'Organic Potatoes',
        price: 1.9,
        unit: 'kg',
        image:
          'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&q=80', // Potatoes
        farmer: 'Mikheil Javakhishvili',
        rating: 4.5,
      },
    ];

    this.breadcrumbItems = [
      { label: 'Home', routerLink: '/' },
      { label: 'Marketplace', routerLink: '/marketplace' },
      { label: this.product.name },
    ];
  }

  private loadProduct(productId: string): void {
    console.log('Loading product with ID:', productId);
  }

  onQuantityChange(value: number): void {
    this.quantity = value;
  }

  onAddToCart(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `${this.product.name} added to cart`,
      life: 3000,
    });
  }

  onToggleWishlist(): void {
    this.isWishlisted = !this.isWishlisted;
    this.messageService.add({
      severity: 'info',
      summary: 'Wishlist',
      detail: this.isWishlisted ? 'Added to wishlist' : 'Removed from wishlist',
      life: 2000,
    });
  }

  onShare(): void {
    if (navigator.share) {
      navigator
        .share({
          title: this.product.name,
          text: this.product.description,
          url: window.location.href,
        })
        .catch((err) => console.log('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      this.messageService.add({
        severity: 'info',
        summary: 'Link copied',
        detail: 'Product link copied to clipboard',
        life: 2000,
      });
    }
  }

  onViewFarmerProfile(): void {
    this.router.navigate(['/farmer', this.product.farmer.id]);
  }

  onMessageFarmer(): void {
    console.log('Message farmer:', this.product.farmer.name);
  }

  onQuickMessage(): void {
    console.log('Quick message to:', this.product.farmer.name);
  }

  onNavigateToProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }
}
