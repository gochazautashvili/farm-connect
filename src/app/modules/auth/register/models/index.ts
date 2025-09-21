export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  farmName: string;
  farmLocation: string;
  farmSize: string;
  farmDescription: string;
  productTypes: string[];
  farmPhotos: File[];
  deliveryAddress: string;
  city: string;
  region: string;
  organicOnly: boolean;
  localOnly: boolean;
  notifications: boolean;
}

export type UserType = 'farmer' | 'consumer';

export interface FarmSize {
  value: string;
  label: string;
}

export interface GeorgianRegion {
  value: string;
  label: string;
}

export interface ProductCategory {
  value: string;
  label: string;
}
