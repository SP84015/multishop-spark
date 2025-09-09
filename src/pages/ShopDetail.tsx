import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Globe,
  Facebook,
  Instagram,
  MessageCircle,
  Star,
  Heart,
  Share2,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { shops } from '@/data/shops';

const ShopDetail = () => {
  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const shop = shops.find(s => s.slug === slug);

  if (!shop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Shop Not Found</h1>
          <p className="text-muted-foreground mb-6">The shop you're looking for doesn't exist.</p>
          <Button asChild className="btn-hero">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as keyof typeof shop.hours;
  const todayHours = shop.hours[currentDay];

  return (
    <div className={`min-h-screen theme-${shop.theme}`}>
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <img
          src={shop.bannerImage}
          alt={shop.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Navigation */}
        <div className="absolute top-4 left-4 z-10">
          <Button asChild variant="secondary" className="bg-background/90 backdrop-blur-sm">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shops
            </Link>
          </Button>
        </div>

        {/* Actions */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setIsFavorite(!isFavorite)}
            className={`bg-background/90 backdrop-blur-sm ${isFavorite ? 'text-red-500' : ''}`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="bg-background/90 backdrop-blur-sm"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Shop Info Overlay */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="container-responsive">
            <div className="flex items-end gap-6">
              <div className="w-20 h-20 rounded-xl overflow-hidden shadow-strong ring-4 ring-background flex-shrink-0">
                <img
                  src={shop.logo}
                  alt={`${shop.name} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge className="bg-background/90 text-foreground">
                    {shop.category}
                  </Badge>
                  {shop.featured && (
                    <Badge className="bg-warning text-warning-foreground">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Featured
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {shop.name}
                </h1>
                <p className="text-white/90 text-lg">
                  {shop.shortDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-responsive py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* About Section */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">About</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {shop.fullDescription}
              </p>
            </section>

            {/* Services Section */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {shop.services.map((service, index) => (
                  <div key={index} className="flex items-center p-4 rounded-lg bg-muted/30">
                    <div className="w-2 h-2 rounded-full bg-primary mr-3 flex-shrink-0" />
                    <span className="text-foreground font-medium">{service}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Highlights Section */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Why Choose Us</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {shop.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center p-4 rounded-lg bg-primary/5 border border-primary/10">
                    <Star className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Gallery Section */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Gallery</h2>
              <div className="gallery-grid">
                {shop.images.map((image, index) => (
                  <div
                    key={index}
                    className="gallery-item"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img src={image} alt={`${shop.name} gallery ${index + 1}`} />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-medium">
                        View Image
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact Form */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
              <div className="card-elevated p-8">
                <p className="text-muted-foreground mb-6">
                  Have questions or want to learn more? Send us a message and we'll get back to you soon.
                </p>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input placeholder="Your Name" />
                    <Input type="email" placeholder="Your Email" />
                  </div>
                  <Input placeholder="Subject" />
                  <Textarea placeholder="Your Message" rows={4} />
                  <Button className="btn-hero w-full sm:w-auto">
                    Send Message
                  </Button>
                </form>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="card-elevated p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{shop.contact.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href={`tel:${shop.contact.phone}`} className="text-muted-foreground hover:text-primary">
                    {shop.contact.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href={`mailto:${shop.contact.email}`} className="text-muted-foreground hover:text-primary">
                    {shop.contact.email}
                  </a>
                </div>
                {shop.contact.website && (
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-primary flex-shrink-0" />
                    <a href={`https://${shop.contact.website}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                      {shop.contact.website}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Hours */}
            <div className="card-elevated p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Hours
              </h3>
              <div className="space-y-2">
                {Object.entries(shop.hours).map(([day, hours]) => (
                  <div key={day} className={`flex justify-between ${day === currentDay ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                    <span className="capitalize">{day}</span>
                    <span>{hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
                <div className="text-sm font-medium text-primary">Today: {todayHours}</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="card-elevated p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Follow Us</h3>
              <div className="flex space-x-3">
                {shop.social.facebook && (
                  <a href={shop.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
                {shop.social.instagram && (
                  <a href={shop.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {shop.social.whatsapp && (
                  <a href={`https://wa.me/${shop.social.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <Button className="w-full btn-hero" asChild>
                <a href={`tel:${shop.contact.phone}`}>
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </a>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <a href={`mailto:${shop.contact.email}`}>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage}
              alt="Gallery image"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopDetail;