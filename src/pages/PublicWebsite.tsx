import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin,
  Send,
  ArrowRight,
  Star,
  CheckCircle,
  Heart
} from 'lucide-react';
import { toast } from 'sonner';
import * as LucideIcons from 'lucide-react';

interface Website {
  id: string;
  name: string;
  slug: string;
  about_title?: string;
  about_content?: string;
  contact_email?: string;
  contact_phone?: string;
  contact_address?: string;
  logo_url?: string;
  banner_url?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  theme_primary_color: string;
  theme_secondary_color: string;
  theme_accent_color: string;
  theme_font_family: string;
  social_facebook?: string;
  social_instagram?: string;
  social_twitter?: string;
  social_linkedin?: string;
}

interface Service {
  id: string;
  title: string;
  description?: string;
  icon_name?: string;
}

interface GalleryImage {
  id: string;
  image_url: string;
  alt_text?: string;
  order_index: number;
}

const PublicWebsite = () => {
  const [website, setWebsite] = useState<Website | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchActiveWebsite();
  }, []);

  const fetchActiveWebsite = async () => {
    try {
      // Fetch active website
      const { data: websiteData, error: websiteError } = await supabase
        .from('websites')
        .select('*')
        .eq('is_active', true)
        .single();

      if (websiteError) {
        if (websiteError.code === 'PGRST116') {
          // No active website found
          setWebsite(null);
        } else {
          throw websiteError;
        }
      } else {
        setWebsite(websiteData);

        // Fetch services and gallery for this website
        const [servicesResponse, galleryResponse] = await Promise.all([
          supabase
            .from('website_services')
            .select('*')
            .eq('website_id', websiteData.id)
            .order('created_at'),
          supabase
            .from('website_gallery')
            .select('*')
            .eq('website_id', websiteData.id)
            .order('order_index')
        ]);

        if (servicesResponse.data) setServices(servicesResponse.data);
        if (galleryResponse.data) setGallery(galleryResponse.data);

        // Update page title and meta
        if (websiteData.seo_title) {
          document.title = websiteData.seo_title;
        }
        
        // Update meta description
        if (websiteData.seo_description) {
          let metaDescription = document.querySelector('meta[name="description"]');
          if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
          }
          metaDescription.setAttribute('content', websiteData.seo_description);
        }
      }
    } catch (error) {
      console.error('Error fetching website:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!website) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          website_id: website.id,
          name: contactForm.name,
          email: contactForm.email,
          subject: contactForm.subject,
          message: contactForm.message
        });

      if (error) throw error;

      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getIconComponent = (iconName?: string) => {
    if (!iconName) return Star;
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent || Star;
  };

  // Apply custom theme
  useEffect(() => {
    if (website) {
      document.documentElement.style.setProperty('--primary', website.theme_primary_color.replace('hsl(', '').replace(')', ''));
      document.documentElement.style.setProperty('--secondary', website.theme_secondary_color.replace('hsl(', '').replace(')', ''));
      document.documentElement.style.setProperty('--accent', website.theme_accent_color.replace('hsl(', '').replace(')', ''));
      
      if (website.theme_font_family) {
        document.body.style.fontFamily = `'${website.theme_font_family}', sans-serif`;
      }
    }

    return () => {
      // Reset to defaults when component unmounts
      document.documentElement.style.setProperty('--primary', '234 89% 74%');
      document.documentElement.style.setProperty('--secondary', '220 14% 96%');
      document.documentElement.style.setProperty('--accent', '234 89% 74%');
      document.body.style.fontFamily = '';
    };
  }, [website]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!website) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="text-center max-w-md mx-auto p-8">
          <Globe className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-foreground mb-4">
            No Website Available
          </h1>
          <p className="text-muted-foreground mb-6">
            There's currently no active website to display. Please check back later or contact the administrator.
          </p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: website.banner_url ? `url(${website.banner_url})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-primary/20" />
        
        <div className="container-responsive relative z-10 text-center">
          {/* Logo */}
          {website.logo_url && (
            <div className="mb-8 animate-fade-in">
              <img
                src={website.logo_url}
                alt={`${website.name} logo`}
                className="w-24 h-24 mx-auto rounded-2xl object-cover shadow-strong"
              />
            </div>
          )}

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-in text-balance">
            {website.name}
          </h1>
          
          {website.about_title && (
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-up text-balance">
              {website.about_title}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Button className="btn-hero" size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Get in Touch
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            {services.length > 0 && (
              <Button variant="outline" size="lg" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
                Our Services
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      {website.about_content && (
        <section id="about" className="py-20 bg-muted/20">
          <div className="container-responsive">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                <Heart className="w-4 h-4 mr-2" />
                About Us
              </Badge>
              
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              
              <div 
                className="text-lg text-muted-foreground leading-relaxed prose prose-lg mx-auto"
                dangerouslySetInnerHTML={{ __html: website.about_content.replace(/\n/g, '<br>') }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {services.length > 0 && (
        <section id="services" className="py-20">
          <div className="container-responsive">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-warning/10 text-warning border-warning/20">
                <CheckCircle className="w-4 h-4 mr-2" />
                Services
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What We Offer
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover our range of professional services designed to meet your needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const IconComponent = getIconComponent(service.icon_name);
                return (
                  <Card key={service.id} className="card-interactive">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {service.title}
                      </h3>
                      {service.description && (
                        <p className="text-muted-foreground">
                          {service.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {gallery.length > 0 && (
        <section id="gallery" className="py-20 bg-muted/20">
          <div className="container-responsive">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-success/10 text-success border-success/20">
                <Star className="w-4 h-4 mr-2" />
                Gallery
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Work
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Take a look at some of our recent projects and achievements
              </p>
            </div>

            <div className="gallery-grid">
              {gallery.map((image) => (
                <div key={image.id} className="gallery-item">
                  <img
                    src={image.image_url}
                    alt={image.alt_text || 'Gallery image'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Get in Touch
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground mb-6">Contact Information</h3>
                
                {website.contact_email && (
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-foreground">{website.contact_email}</p>
                    </div>
                  </div>
                )}

                {website.contact_phone && (
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="text-foreground">{website.contact_phone}</p>
                    </div>
                  </div>
                )}

                {website.contact_address && (
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="text-foreground">{website.contact_address}</p>
                    </div>
                  </div>
                )}

                {/* Social Links */}
                <div className="pt-6">
                  <h4 className="text-sm font-medium text-muted-foreground mb-4">Follow Us</h4>
                  <div className="flex space-x-3">
                    {website.social_facebook && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={website.social_facebook} target="_blank" rel="noopener noreferrer">
                          <Facebook className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    {website.social_instagram && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={website.social_instagram} target="_blank" rel="noopener noreferrer">
                          <Instagram className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    {website.social_twitter && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={website.social_twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    {website.social_linkedin && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={website.social_linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <Card className="card-elevated">
                <CardContent className="p-6">
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <Input
                        placeholder="Your Name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        required
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        required
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <Input
                        placeholder="Subject"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Your Message"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        required
                        rows={4}
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full btn-hero"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container-responsive text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} {website.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PublicWebsite;