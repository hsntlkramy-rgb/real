import { useState, useMemo } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Link } from 'wouter';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PropertyModal } from '@/components/property-modal';
import { LikedPropertiesModal } from '@/components/liked-properties-modal';
import { PropertyWithScore, UserStats } from '@/lib/types';
import { Heart, Search, MapPin, Filter, Grid, List, Home, Zap, Map, User, LogOut } from 'lucide-react';
import { properties, api } from '@/data/properties';

export default function HomePage() {
  const { user, logout } = useAuth();
  const [sessionId] = useState(() => crypto.randomUUID());
  const [selectedProperty, setSelectedProperty] = useState<PropertyWithScore | null>(null);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [showLikedModal, setShowLikedModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Fetch all properties with search enhancement
  const { data: allProperties = [], isLoading: propertiesLoading } = useQuery<PropertyWithScore[]>({
    queryKey: ['/api/properties', searchQuery],
    queryFn: async () => {
      const params = searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : '';
      const response = await fetch(`/api/properties${params}`);
      if (!response.ok) throw new Error('Failed to fetch properties');
      return response.json();
    },
  });

  // Fetch user stats
  const { data: stats } = useQuery<UserStats>({
    queryKey: ['/api/stats', sessionId],
  });

  // Fetch liked properties
  const { data: likedProperties = [] } = useQuery<PropertyWithScore[]>({
    queryKey: ['/api/liked', sessionId],
  });

  // Mock user stats for now
  // const stats: UserStats = {
  //   totalSeen: allProperties.length,
  //   totalLiked: 0,
  //   matchRate: 0.8
  // };

  // Mock liked properties for now
  // const likedProperties: PropertyWithScore[] = [];

  // Record interaction mutation (client-side only for now)
  const recordInteractionMutation = useMutation({
    mutationFn: async ({ propertyId, action }: { propertyId: number; action: string }) => {
      // For now, just log the interaction
      console.log(`Interaction: ${action} on property ${propertyId}`);
      return Promise.resolve({ success: true });
    },
    onSuccess: () => {
      // Invalidate queries if needed
      queryClient.invalidateQueries({ queryKey: ['/api/stats', sessionId] });
      queryClient.invalidateQueries({ queryKey: ['/api/liked', sessionId] });
    }
  });

  // Filter properties based on search criteria
  const filteredProperties = useMemo(() => {
    if (!Array.isArray(allProperties)) return [];
    
    return allProperties.filter((property: PropertyWithScore) => {
      const matchesSearch = searchQuery === '' || 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesPrice = priceRange === '' || priceRange === 'all' || (() => {
        // Extract numeric value from price string
        const priceStr = property.price.replace(/[^0-9]/g, '');
        const price = parseInt(priceStr);
        if (isNaN(price)) return true; // If we can't parse price, show it
        
        switch (priceRange) {
          case 'under-2000': return price < 2000;
          case '2000-3000': return price >= 2000 && price <= 3000;
          case '3000-5000': return price >= 3000 && price <= 5000;
          case 'over-5000': return price > 5000;
          default: return true;
        }
      })();

      const matchesType = propertyType === '' || propertyType === 'all' || 
        property.tags.some((tag: string) => tag.toLowerCase().includes(propertyType.toLowerCase()));

      return matchesSearch && matchesPrice && matchesType;
    });
  }, [allProperties, searchQuery, priceRange, propertyType]);

  const handleLike = (propertyId: number) => {
    recordInteractionMutation.mutate({
      propertyId,
      action: 'like'
    });
  };

  const handleViewDetails = (property: PropertyWithScore) => {
    recordInteractionMutation.mutate({
      propertyId: property.id,
      action: 'view'
    });
    setSelectedProperty(property);
    setShowPropertyModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="glass-card sticky top-0 z-50 backdrop-blur-xl bg-white/30 border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="relative">
                <Home className="h-10 w-10 text-purple-600 mr-4" />
                <div className="absolute inset-0 h-10 w-10 bg-purple-600/20 rounded-full blur-lg"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  RealEstateFinder
                </h1>
                <div className="text-sm text-gray-600 hidden sm:block">
                  AI-Powered Real Estate Discovery
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/map">
                <button className="bg-white/20 backdrop-blur-md border border-white/30 text-gray-700 font-medium px-6 py-2.5 rounded-xl shadow-lg transition-all duration-300 hover:bg-white/30 hover:scale-105 flex items-center">
                  <Map className="h-4 w-4 mr-2" />
                  Map View
                </button>
              </Link>
              <Link href="/swipe">
                <button className="gradient-button flex items-center">
                  <Zap className="h-4 w-4 mr-2" />
                  Swipe Mode
                </button>
              </Link>
              {user ? (
                <>
                  <Link href="/dashboard">
                    <button className="bg-white/20 backdrop-blur-md border border-white/30 text-gray-700 font-medium px-6 py-2.5 rounded-xl shadow-lg transition-all duration-300 hover:bg-white/30 hover:scale-105 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Dashboard
                    </button>
                  </Link>
                  <button 
                    onClick={logout}
                    className="bg-white/20 backdrop-blur-md border border-white/30 text-gray-700 font-medium px-6 py-2.5 rounded-xl shadow-lg transition-all duration-300 hover:bg-white/30 hover:scale-105 flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <button className="bg-white/20 backdrop-blur-md border border-white/30 text-gray-700 font-medium px-6 py-2.5 rounded-xl shadow-lg transition-all duration-300 hover:bg-white/30 hover:scale-105 flex items-center">
                      Login
                    </button>
                  </Link>
                  <Link href="/register">
                    <button className="gradient-button">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
              <button
                onClick={() => setShowLikedModal(true)}
                className="relative bg-white/20 backdrop-blur-md border border-white/30 text-gray-700 hover:text-pink-600 transition-all duration-300 hover:bg-white/30 hover:scale-105 p-3 rounded-xl shadow-lg"
              >
                <Heart className="h-5 w-5" />
                {likedProperties.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg pulse-ring">
                    {likedProperties.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Find Your Perfect Property</h2>
          <p className="text-xl mb-8 opacity-90">
            Discover properties that match your lifestyle and preferences
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/swipe">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 px-8 py-3">
                <Zap className="h-5 w-5 mr-2" />
                Try Swipe Mode
              </Button>
            </Link>
            <p className="text-sm opacity-75">Like Tinder, but for real estate</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white shadow-sm border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative flex-1 w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by location, property type, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Price Range Filter */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-2000">Under $2,000</SelectItem>
                <SelectItem value="2000-3000">$2,000 - $3,000</SelectItem>
                <SelectItem value="3000-5000">$3,000 - $5,000</SelectItem>
                <SelectItem value="over-5000">Over $5,000</SelectItem>
              </SelectContent>
            </Select>

            {/* Property Type Filter */}
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
                <SelectItem value="family">Family-Friendly</SelectItem>
                <SelectItem value="modern">Modern</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
                <SelectItem value="remote">Remote Work</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode Toggle */}
            <div className="flex border border-gray-300 rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            {filteredProperties.length} properties found
          </div>
        </div>
      </div>

      {/* Properties Grid/List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            <Home className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No properties found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-6'
          }>
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
                onClick={() => handleViewDetails(property)}
              >
                <img
                  src={property.img_url || property.images?.[0] || 'https://via.placeholder.com/150'}
                  alt={property.title}
                  className={viewMode === 'list'
                    ? 'w-32 h-24 object-cover rounded'
                    : 'w-full h-48 object-cover rounded-t'
                  }
                />
                <div className="p-4 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                      {property.title}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(property.id);
                      }}
                      className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                    >
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                  </p>
                  
                  <p className="text-primary font-bold text-lg mb-3">{property.price}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {property.tags.slice(0, 3).map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {viewMode === 'list' && (
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {property.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Property Modal */}
      <PropertyModal
        property={selectedProperty}
        isOpen={showPropertyModal}
        onClose={() => setShowPropertyModal(false)}
        onLike={() => selectedProperty && handleLike(selectedProperty.id)}
        onPass={() => setShowPropertyModal(false)}
      />

      {/* Liked Properties Modal */}
      <LikedPropertiesModal
        properties={likedProperties}
        isOpen={showLikedModal}
        onClose={() => setShowLikedModal(false)}
        onPropertySelect={(property) => {
          setSelectedProperty(property);
          setShowPropertyModal(true);
        }}
      />

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">
            RealEstateFinder helps you discover lifestyle-aligned properties. Transactions occur outside the platform.
          </p>
        </div>
      </footer>
    </div>
  );
}