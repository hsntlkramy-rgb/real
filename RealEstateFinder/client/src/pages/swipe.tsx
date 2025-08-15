import { useState, useEffect } from 'react';
import SwipeCard from '../components/swipe-card';
import { Loader2, ArrowLeft, ArrowRight, MapPin, DollarSign } from 'lucide-react';
import { Alert } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { properties as allProperties } from '@/data/properties';
import { PropertyWithScore } from '@/lib/types';

interface Country {
  code: string;
  name: string;
  flag: string;
  currency: string;
  description: string;
}

const availableCountries: Country[] = [
  { code: 'UAE', name: 'United Arab Emirates', flag: '🇦🇪', currency: 'AED', description: 'Luxury properties in Dubai, Abu Dhabi' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', description: 'Properties across England, Scotland, Wales' },
  { code: 'USA', name: 'United States', flag: '🇺🇸', currency: 'USD', description: 'American properties from coast to coast' },
  { code: 'CY', name: 'Cyprus', flag: '🇨🇾', currency: 'EUR', description: 'Mediterranean island properties' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', currency: 'EUR', description: 'Italian properties and villas' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', currency: 'EUR', description: 'Spanish coastal and city properties' },
  { code: 'FR', name: 'France', flag: '🇫🇷', currency: 'EUR', description: 'French properties and chateaux' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR', description: 'German urban and rural properties' },
];

type SwipeStep = 'country' | 'price' | 'swipe';

export default function SwipePage() {
  const [currentStep, setCurrentStep] = useState<SwipeStep>('country');
  const [properties, setProperties] = useState<PropertyWithScore[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const loadProperties = async () => {
    if (!selectedCountry) return;
    
    setLoading(true);
    setError(null);
    setCurrentIndex(0);
    
    try {
      // Filter properties by country using our client-side data
      let filteredProperties = allProperties.filter(property => 
        property.country === selectedCountry.code
      );
      
      // Apply price filters if set
      if (minPrice.trim() || maxPrice.trim()) {
        filteredProperties = filteredProperties.filter(property => {
          const priceStr = property.price.replace(/[^0-9]/g, '');
          const price = parseInt(priceStr);
          if (isNaN(price)) return true;
          
          if (minPrice.trim() && price < parseInt(minPrice)) return false;
          if (maxPrice.trim() && price > parseInt(maxPrice)) return false;
          return true;
        });
      }
      
      setProperties(filteredProperties);
      setCurrentStep('swipe');
    } catch (err) {
      setError('Failed to load properties. Please try again.');
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    // Handle like/dislike logic here
    if (direction === 'right') {
      // Save to liked properties
      console.log('Liked property:', properties[currentIndex]);
    }
    
    // Move to next property
    if (currentIndex < properties.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setCurrentStep('price');
  };

  const handleSkipPriceFilter = () => {
    loadProperties();
  };

  const handleApplyPriceFilter = () => {
    loadProperties();
  };

  const resetSelection = () => {
    setSelectedCountry(null);
    setMinPrice('');
    setMaxPrice('');
    setCurrentStep('country');
    setProperties([]);
    setCurrentIndex(0);
  };

  // Country Selection Step
  if (currentStep === 'country') {
  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              🏠 Find Your Dream Home
          </h1>
            <p className="text-xl text-gray-600">
              Choose a country to start exploring properties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCountries.map((country) => (
              <Card 
                key={country.code}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-blue-500"
                onClick={() => handleCountrySelect(country)}
              >
                <CardHeader className="text-center">
                  <div className="text-6xl mb-2">{country.flag}</div>
                  <CardTitle className="text-xl">{country.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {country.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge variant="secondary" className="text-sm">
                    Currency: {country.currency}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Price Filter Step
  if (currentStep === 'price') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Button
              variant="ghost"
              onClick={resetSelection}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Countries
            </Button>
            
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-4xl">{selectedCountry?.flag}</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {selectedCountry?.name}
                </h1>
                <p className="text-gray-600">Set your price range (optional)</p>
              </div>
            </div>
          </div>

          <Card className="p-6">
            <CardHeader className="text-center pb-4">
              <CardTitle className="flex items-center justify-center gap-2">
                <DollarSign className="h-6 w-6" />
                Price Filter
              </CardTitle>
              <CardDescription>
                Filter properties by price range, or skip to see all properties
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Price ({selectedCountry?.currency})
                  </label>
            <Input
              type="number"
                    placeholder="e.g. 100000"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full"
            />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Price ({selectedCountry?.currency})
                  </label>
            <Input
              type="number"
                    placeholder="e.g. 500000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  variant="outline"
                  onClick={handleSkipPriceFilter}
                  className="flex-1"
                  disabled={loading}
                >
                  Skip Price Filter
                </Button>
                <Button
                  onClick={handleApplyPriceFilter}
              className="flex-1"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Apply Filter
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Swipe Step
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={resetSelection}
            size="sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Change Country
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-2xl">{selectedCountry?.flag}</span>
            <div className="text-center">
              <h1 className="text-lg font-bold text-primary">
                {selectedCountry?.name}
              </h1>
              {(minPrice || maxPrice) && (
                <p className="text-xs text-gray-500">
                  {minPrice && `Min: ${minPrice} ${selectedCountry?.currency}`}
                  {minPrice && maxPrice && ' - '}
                  {maxPrice && `Max: ${maxPrice} ${selectedCountry?.currency}`}
                </p>
              )}
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            {currentIndex + 1} / {properties.length}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4">
        {loading ? (
          <div className="flex items-center gap-2 text-blue-600">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading properties...</span>
          </div>
        ) : error ? (
          <Alert variant="destructive" className="max-w-md mx-auto">
            {error}
          </Alert>
        ) : properties.length > 0 && currentIndex < properties.length ? (
          <SwipeCard
            property={properties[currentIndex]}
            onSwipe={handleSwipe}
          />
        ) : properties.length > 0 ? (
          <div className="text-center text-gray-600">
            <p className="text-xl mb-4">🎉 No more properties to show!</p>
            <div className="space-y-2">
              <Button
              onClick={() => setCurrentIndex(0)}
                variant="outline"
                className="mr-2"
            >
              Start Over
              </Button>
              <Button
                onClick={resetSelection}
                variant="default"
              >
                Choose Different Country
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600">
            <p className="text-xl mb-2">No properties found</p>
            <p className="text-gray-500 mb-4">Try adjusting your price range</p>
            <Button
              onClick={() => setCurrentStep('price')}
              variant="outline"
            >
              Adjust Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}