import { Heart, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

interface Website {
  name: string;
  contact_email?: string;
  contact_phone?: string;
  social_facebook?: string;
  social_instagram?: string;
  social_twitter?: string;
  social_linkedin?: string;
}

export const Footer = ({ website }: { website?: Website }) => {
  const { t } = useTranslation();
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-8 w-8" />
                <span className="text-xl font-bold">
                  {website?.name || "Veldor"}
                </span>
              </div>
              <p className="text-primary-foreground/80 text-sm">
                Creating magical wedding moments and providing innovative big seed solutions 
                for your special occasions.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#home" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>Wedding Planning</li>
                <li>Venue Selection</li>
                <li>Floral Design</li>
                <li>Photography</li>
                <li>Catering</li>
                <li>Big Seed Solutions</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-sm text-primary-foreground/80">
                <p>{website?.contact_email || "info@veldor.com"}</p>
                <p>{website?.contact_phone || "+1 (555) 123-4567"}</p>
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-3 mt-4">
                {website?.social_facebook && (
                  <a
                    href={website.social_facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                )}
                {website?.social_instagram && (
                  <a
                    href={website.social_instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
                {website?.social_twitter && (
                  <a
                    href={website.social_twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                {website?.social_linkedin && (
                  <a
                    href={website.social_linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
            <p className="text-sm text-primary-foreground/80">
              © {new Date().getFullYear()} {website?.name || "Veldor"}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};