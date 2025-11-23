export enum UserRole {
  GUEST = 'GUEST',
  CUSTOMER = 'CUSTOMER',
  PROVIDER = 'PROVIDER'
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

export interface Provider {
  id: string;
  name: string;
  businessName: string;
  category: string;
  rating: number;
  reviewCount: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  priceStart: number;
  priceType: 'hourly' | 'fixed' | 'visit';
  image: string;
  description: string;
  reviews: Review[];
  phone: string;
  isVerified: boolean;
  distance?: number; // Calculated at runtime
}

export interface Category {
  id: string;
  name: string;
  icon: string; // Lucide icon name or emoji
}

export interface Booking {
  id: string;
  providerId: string;
  providerName: string;
  serviceName: string;
  date: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  price: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  relatedCategory?: string;
}