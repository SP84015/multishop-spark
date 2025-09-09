import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, ExternalLink, Star } from 'lucide-react';
import { Shop } from '@/data/shops';

interface ShopCardProps {
  shop: Shop;
}

const ShopCard = ({ shop }: ShopCardProps) => {
  return (
    <div className={`card-interactive group theme-${shop.theme}`}>
      {/* Shop Image */}
      <div className="relative overflow-hidden rounded-t-lg aspect-[4/3]">
        <img
          src={shop.bannerImage}
          alt={shop.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Featured Badge */}
        {shop.featured && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-warning text-warning-foreground shadow-medium">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Featured
            </Badge>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-background/90 text-foreground">
            {shop.category}
          </Badge>
        </div>

        {/* Shop Logo */}
        <div className="absolute bottom-3 left-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden shadow-medium ring-2 ring-background">
            <img
              src={shop.logo}
              alt={`${shop.name} logo`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Shop Details */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {shop.name}
          </h3>
        </div>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {shop.shortDescription}
        </p>

        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{shop.contact.address}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{shop.contact.phone}</span>
          </div>
        </div>

        {/* Services Preview */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {shop.services.slice(0, 3).map((service, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {service}
              </Badge>
            ))}
            {shop.services.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{shop.services.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button asChild className="flex-1 btn-hero">
            <Link to={`/shop/${shop.slug}`}>
              View Details
              <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;