import { Category, Provider } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Electrician', icon: 'Zap' },
  { id: '2', name: 'Plumber', icon: 'Droplet' },
  { id: '3', name: 'Carpenter', icon: 'Hammer' },
  { id: '4', name: 'Cleaning', icon: 'Sparkles' },
  { id: '5', name: 'AC Repair', icon: 'Thermometer' },
  { id: '6', name: 'Painter', icon: 'Paintbrush' },
  { id: '7', name: 'Salon', icon: 'Scissors' },
  { id: '8', name: 'Mechanic', icon: 'Wrench' },
];

export const MOCK_PROVIDERS: Provider[] = [
  {
    id: 'p1',
    name: 'John Doe',
    businessName: 'Spark Master Electric',
    category: 'Electrician',
    rating: 4.8,
    reviewCount: 124,
    location: { lat: 40.7128, lng: -74.0060, address: '123 Main St, Downtown' },
    priceStart: 40,
    priceType: 'visit',
    image: 'https://picsum.photos/400/400?random=1',
    description: 'Expert residential electrician with 10 years of experience. Quick troubleshooting and installations.',
    phone: '+1234567890',
    isVerified: true,
    reviews: [
      { id: 'r1', userId: 'u2', userName: 'Alice', rating: 5, comment: 'Fixed my wiring in 20 mins!', date: '2023-10-10' }
    ]
  },
  {
    id: 'p2',
    name: 'Sarah Smith',
    businessName: 'Pristine Home Cleaners',
    category: 'Cleaning',
    rating: 4.9,
    reviewCount: 89,
    location: { lat: 40.7150, lng: -74.0090, address: '45 Park Ave' },
    priceStart: 25,
    priceType: 'hourly',
    image: 'https://picsum.photos/400/400?random=2',
    description: 'Eco-friendly home cleaning services. Deep cleaning, regular maintenance, and move-in/out support.',
    phone: '+1987654321',
    isVerified: true,
    reviews: []
  },
  {
    id: 'p3',
    name: 'Mike Ross',
    businessName: 'Ross Plumbing Solutions',
    category: 'Plumber',
    rating: 4.5,
    reviewCount: 56,
    location: { lat: 40.7200, lng: -74.0020, address: '88 Elm St' },
    priceStart: 50,
    priceType: 'visit',
    image: 'https://picsum.photos/400/400?random=3',
    description: 'Emergency plumbing services available 24/7. Leak detection and pipe repair specialists.',
    phone: '+1122334455',
    isVerified: false,
    reviews: []
  },
  {
    id: 'p4',
    name: 'Emily Blunt',
    businessName: 'Luxe Salon at Home',
    category: 'Salon',
    rating: 5.0,
    reviewCount: 210,
    location: { lat: 40.7100, lng: -74.0100, address: 'Mobile Service' },
    priceStart: 30,
    priceType: 'fixed',
    image: 'https://picsum.photos/400/400?random=4',
    description: 'Premium salon services at your doorstep. Facials, haircuts, and makeup for events.',
    phone: '+1555666777',
    isVerified: true,
    reviews: []
  },
   {
    id: 'p5',
    name: 'David Goggins',
    businessName: 'Iron Hammer Carpentry',
    category: 'Carpenter',
    rating: 4.7,
    reviewCount: 42,
    location: { lat: 40.7180, lng: -74.0040, address: '12 Workshop Ln' },
    priceStart: 60,
    priceType: 'hourly',
    image: 'https://picsum.photos/400/400?random=5',
    description: 'Custom furniture, repairs, and wood finishing. Quality craftsmanship guaranteed.',
    phone: '+1888999000',
    isVerified: true,
    reviews: []
  },
];