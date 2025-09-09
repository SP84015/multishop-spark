import coffeeLogo from '@/assets/coffee-logo.jpg';
import coffeeBanner from '@/assets/coffee-banner.jpg';
import coffeeGallery1 from '@/assets/coffee-gallery-1.jpg';
import coffeeGallery2 from '@/assets/coffee-gallery-2.jpg';
import wellnessLogo from '@/assets/wellness-logo.jpg';
import wellnessBanner from '@/assets/wellness-banner.jpg';
import wellnessGallery1 from '@/assets/wellness-gallery-1.jpg';
import wellnessGallery2 from '@/assets/wellness-gallery-2.jpg';
import techLogo from '@/assets/tech-logo.jpg';
import techBanner from '@/assets/tech-banner.jpg';
import boutiqueLogo from '@/assets/boutique-logo.jpg';
import boutiqueBanner from '@/assets/boutique-banner.jpg';

export interface Shop {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  theme: 'blue' | 'green' | 'red' | 'orange' | 'purple';
  logo: string;
  bannerImage: string;
  images: string[];
  contact: {
    phone: string;
    email: string;
    address: string;
    website?: string;
  };
  social: {
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
  };
  services: string[];
  highlights: string[];
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  featured: boolean;
}

export const shops: Shop[] = [
  {
    id: '1',
    name: 'Artisan Coffee Roasters',
    slug: 'artisan-coffee',
    shortDescription: 'Premium specialty coffee with expert roasting and a cozy atmosphere.',
    fullDescription: 'Welcome to Artisan Coffee Roasters, where passion meets perfection in every cup. We are dedicated to sourcing the finest beans from around the world and roasting them to perfection in small batches. Our cozy café offers a warm atmosphere where coffee lovers can enjoy expertly crafted beverages, from classic espressos to innovative seasonal specials.',
    category: 'Food & Beverage',
    theme: 'blue',
    logo: coffeeLogo,
    bannerImage: coffeeBanner,
    images: [
      coffeeGallery1,
      coffeeGallery2,
      coffeeGallery1,
      coffeeGallery2
    ],
    contact: {
      phone: '+1 (555) 123-0001',
      email: 'hello@artisancoffee.com',
      address: '123 Coffee Street, Downtown, NY 10001',
      website: 'www.artisancoffee.com'
    },
    social: {
      facebook: 'https://facebook.com/artisancoffee',
      instagram: 'https://instagram.com/artisancoffee',
      whatsapp: '+15551230001'
    },
    services: [
      'Fresh Coffee Roasting',
      'Espresso Bar',
      'Coffee Subscriptions',
      'Barista Training',
      'Corporate Catering'
    ],
    highlights: [
      'Award-winning coffee blends',
      'Expert baristas',
      'Cozy atmosphere',
      'Free WiFi',
      'Local artwork displays'
    ],
    hours: {
      monday: '6:00 AM - 8:00 PM',
      tuesday: '6:00 AM - 8:00 PM',
      wednesday: '6:00 AM - 8:00 PM',
      thursday: '6:00 AM - 8:00 PM',
      friday: '6:00 AM - 9:00 PM',
      saturday: '7:00 AM - 9:00 PM',
      sunday: '7:00 AM - 7:00 PM'
    },
    featured: true
  },
  {
    id: '2',
    name: 'Green Garden Wellness',
    slug: 'green-garden-wellness',
    shortDescription: 'Holistic wellness center offering natural therapies and organic products.',
    fullDescription: 'Green Garden Wellness is your sanctuary for natural health and healing. We offer a comprehensive range of holistic services including massage therapy, acupuncture, herbal consultations, and yoga classes. Our certified practitioners are committed to helping you achieve optimal wellness through natural, non-invasive treatments in a peaceful environment.',
    category: 'Health & Wellness',
    theme: 'green',
    logo: wellnessLogo,
    bannerImage: wellnessBanner,
    images: [
      wellnessGallery1,
      wellnessGallery2,
      wellnessGallery1,
      wellnessGallery2
    ],
    contact: {
      phone: '+1 (555) 123-0002',
      email: 'info@greengardenwellness.com',
      address: '456 Wellness Way, Garden District, NY 10002'
    },
    social: {
      facebook: 'https://facebook.com/greengardenwellness',
      instagram: 'https://instagram.com/greengardenwellness',
      whatsapp: '+15551230002'
    },
    services: [
      'Massage Therapy',
      'Acupuncture',
      'Herbal Medicine',
      'Yoga Classes',
      'Nutrition Counseling'
    ],
    highlights: [
      'Certified practitioners',
      'Organic products',
      'Peaceful environment',
      'Flexible scheduling',
      'Wellness workshops'
    ],
    hours: {
      monday: '8:00 AM - 7:00 PM',
      tuesday: '8:00 AM - 7:00 PM',
      wednesday: '8:00 AM - 7:00 PM',
      thursday: '8:00 AM - 7:00 PM',
      friday: '8:00 AM - 6:00 PM',
      saturday: '9:00 AM - 5:00 PM',
      sunday: '10:00 AM - 4:00 PM'
    },
    featured: true
  },
  {
    id: '3',
    name: 'TechFix Solutions',
    slug: 'techfix-solutions',
    shortDescription: 'Professional device repair and IT support services for all your technology needs.',
    fullDescription: 'TechFix Solutions is your trusted partner for all technology repair and support needs. Our certified technicians specialize in smartphone, tablet, laptop, and desktop repairs with quick turnaround times and competitive pricing. We also offer comprehensive IT support services for businesses, including network setup, data recovery, and cybersecurity solutions.',
    category: 'Technology',
    theme: 'red',
    logo: techLogo,
    bannerImage: techBanner,
    images: [
      techBanner,
      techLogo,
      techBanner,
      techLogo
    ],
    contact: {
      phone: '+1 (555) 123-0003',
      email: 'support@techfixsolutions.com',
      address: '789 Tech Plaza, Innovation District, NY 10003',
      website: 'www.techfixsolutions.com'
    },
    social: {
      facebook: 'https://facebook.com/techfixsolutions',
      instagram: 'https://instagram.com/techfixsolutions'
    },
    services: [
      'Smartphone Repair',
      'Laptop & Desktop Repair',
      'Data Recovery',
      'IT Support',
      'Network Solutions'
    ],
    highlights: [
      'Certified technicians',
      'Quick turnaround',
      'Warranty guarantee',
      'Business IT support',
      'Competitive pricing'
    ],
    hours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '10:00 AM - 4:00 PM',
      sunday: 'Closed'
    },
    featured: false
  },
  {
    id: '4',
    name: 'Bella Vista Boutique',
    slug: 'bella-vista-boutique',
    shortDescription: 'Curated fashion and accessories for the modern, style-conscious individual.',
    fullDescription: 'Bella Vista Boutique offers carefully curated fashion collections that blend contemporary style with timeless elegance. Our boutique features clothing, accessories, and jewelry from emerging and established designers. We pride ourselves on providing personalized styling services and creating a warm, welcoming shopping experience for fashion enthusiasts.',
    category: 'Fashion & Retail',
    theme: 'purple',
    logo: boutiqueLogo,
    bannerImage: boutiqueBanner,
    images: [
      boutiqueBanner,
      boutiqueLogo,
      boutiqueBanner,
      boutiqueLogo
    ],
    contact: {
      phone: '+1 (555) 123-0004',
      email: 'style@bellavistaboutique.com',
      address: '321 Fashion Avenue, Style District, NY 10004',
      website: 'www.bellavistaboutique.com'
    },
    social: {
      facebook: 'https://facebook.com/bellavistaboutique',
      instagram: 'https://instagram.com/bellavistaboutique'
    },
    services: [
      'Personal Styling',
      'Custom Alterations',
      'Fashion Consultation',
      'Special Occasion Styling',
      'Wardrobe Planning'
    ],
    highlights: [
      'Curated collections',
      'Personal styling service',
      'Unique accessories',
      'Quality craftsmanship',
      'Seasonal collections'
    ],
    hours: {
      monday: '10:00 AM - 7:00 PM',
      tuesday: '10:00 AM - 7:00 PM',
      wednesday: '10:00 AM - 7:00 PM',
      thursday: '10:00 AM - 8:00 PM',
      friday: '10:00 AM - 8:00 PM',
      saturday: '10:00 AM - 8:00 PM',
      sunday: '12:00 PM - 6:00 PM'
    },
    featured: true
  }
];