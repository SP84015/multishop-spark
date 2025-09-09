import { useState } from 'react';
import { Search, Store, Users, Award, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ShopCard from '@/components/ShopCard';
import { shops } from '@/data/shops';

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredShops = shops.filter(shop =>
    shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shop.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shop.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredShops = shops.filter(shop => shop.featured);
  const categories = [...new Set(shops.map(shop => shop.category))];

  const stats = [
    { icon: Store, label: 'Active Shops', value: shops.length.toString() },
    { icon: Users, label: 'Happy Customers', value: '10K+' },
    { icon: Award, label: 'Years Experience', value: '5+' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,89,156,0.1),transparent_50%)]" />
        
        <div className="container-responsive relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-primary/10 text-primary border-primary/20 animate-bounce-in">
              <Store className="w-4 h-4 mr-2" />
              Discover Local Businesses
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-in text-balance">
              Find Amazing{' '}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Local Shops
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-slide-up text-balance">
              Connect with the best local businesses in your community. From artisan coffee to wellness services, discover unique shops with exceptional service.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8 animate-slide-up">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search shops, categories, or services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg rounded-xl border-2 focus:border-primary shadow-medium"
                />
              </div>
            </div>

            {/* Quick Categories */}
            <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  onClick={() => setSearchQuery(category)}
                  className="btn-ghost rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Shops Section */}
      {featuredShops.length > 0 && (
        <section className="py-16 bg-muted/20">
          <div className="container-responsive">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-warning/10 text-warning border-warning/20">
                <Award className="w-4 h-4 mr-2" />
                Featured
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Featured Shops
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover our handpicked selection of exceptional local businesses
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredShops.map((shop) => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Shops Section */}
      <section id="shops" className="py-16">
        <div className="container-responsive">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'All Shops'}
              </h2>
              <p className="text-lg text-muted-foreground">
                {filteredShops.length} {filteredShops.length === 1 ? 'shop' : 'shops'} found
              </p>
            </div>
            
            {searchQuery && (
              <Button
                variant="ghost"
                onClick={() => setSearchQuery('')}
                className="btn-ghost"
              >
                Clear Search
              </Button>
            )}
          </div>

          {filteredShops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredShops.map((shop) => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No shops found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or browse our featured shops above.
              </p>
              <Button onClick={() => setSearchQuery('')} className="btn-hero">
                Browse All Shops
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-primary-glow/5">
        <div className="container-responsive text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Connect with Local Businesses?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community and discover amazing shops in your area. Support local businesses and find exceptional services.
          </p>
          <Button className="btn-hero" size="lg">
            Get Started Today
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Homepage;