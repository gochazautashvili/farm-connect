// interfaces/product.interface.ts

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fiber: number;
  vitaminC: number;
}

export interface DeliveryInfo {
  estimatedDays: string;
  freeShippingOver: number;
  shippingCost: number;
}

export interface Farmer {
  id: number;
  name: string;
  photo: string;
  farmName: string;
  location: string;
  distance: number;
  rating: number;
  reviewCount: number;
  yearsExperience: number;
  totalProducts: number;
  followers: number;
  isVerified: boolean;
  bio: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  unit: string;
  images: string[];
  farmer: Farmer;
  rating: number;
  reviewCount: number;
  category: string;
  isOrganic: boolean;
  availability: string;
  stock: number;
  nutritionInfo: NutritionInfo;
  deliveryInfo: DeliveryInfo;
}

export interface Review {
  id: number;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  images: string[];
}

export interface RelatedProduct {
  id: number;
  name: string;
  price: number;
  unit: string;
  image: string;
  farmer: string;
  rating: number;
}
