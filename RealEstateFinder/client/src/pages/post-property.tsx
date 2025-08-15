import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Alert } from '../components/ui/alert';
import { Badge } from '../components/ui/badge';
import { 
  ArrowLeft, 
  Home, 
  Upload, 
  MapPin, 
  DollarSign, 
  Bed, 
  Bath, 
  Square,
  Plus,
  X
} from 'lucide-react';
import { Link, useLocation } from 'wouter';
import axios from 'axios';

const availableCountries = [
  { code: 'UAE', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'CY', name: 'Cyprus', flag: '🇨🇾' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
];

const propertyTypes = [
  'Apartment',
  'House',
  'Villa',
  'Townhouse',
  'Condo',
  'Studio',
  'Penthouse',
  'Duplex',
  'Land',
  'Commercial'
];

const amenitiesList = [
  'Pool', 'Gym', 'Parking', 'Garden', 'Balcony', 'Terrace',
  'Security', 'Elevator', 'Storage', 'Laundry', 'Fireplace',
  'Air Conditioning', 'Heating', 'Internet', 'Cable TV',
  'Dishwasher', 'Microwave', 'Furnished', 'Pet Friendly'
];

export default function PostPropertyPage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    country: '',
    city: '',
    address: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    contactPhone: '',
    contactEmail: '',
    images: [] as string[],
    tags: [] as string[],
    amenities: [] as string[],
  });

  const [newTag, setNewTag] = useState('');
  const [newImage, setNewImage] = useState('');

  // Redirect if not logged in
  if (!user) {
    setLocation('/login');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (field: string) => (value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove),
    });
  };

  const addImage = () => {
    if (newImage.trim() && !formData.images.includes(newImage.trim())) {
      setFormData({
        ...formData,
        images: [...formData.images, newImage.trim()],
      });
      setNewImage('');
    }
  };

  const removeImage = (imageToRemove: string) => {
    setFormData({
      ...formData,
      images: formData.images.filter(image => image !== imageToRemove),
    });
  };

  const toggleAmenity = (amenity: string) => {
    const isSelected = formData.amenities.includes(amenity);
    if (isSelected) {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter(a => a !== amenity),
      });
    } else {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, amenity],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const propertyData = {
        userId: user.id,
        title: formData.title,
        description: formData.description,
        price: formData.price,
        location: `${formData.city}, ${formData.country}`,
        country: formData.country,
        city: formData.city,
        address: formData.address,
        propertyType: formData.propertyType,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : undefined,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : undefined,
        area: formData.area,
        images: formData.images.length > 0 ? formData.images : ['https://via.placeholder.com/400x300'],
        tags: formData.tags,
        amenities: formData.amenities,
        contactPhone: formData.contactPhone,
        contactEmail: formData.contactEmail || user.email,
        personas: {
          remoteWorker: 0.5,
          family: 0.5,
          investor: 0.5,
          retiree: 0.5,
          luxury: 0.5,
        },
        coordinates: { lat: 0, lng: 0 }, // Would be geocoded in production
        status: 'active',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await axios.post('/api/properties', propertyData);
      setSuccess(true);
      setTimeout(() => {
        setLocation('/dashboard');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to post property');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Property Posted!</h2>
            <p className="text-gray-600 mb-4">Your property has been successfully posted and is now live.</p>
            <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Home className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold">Post New Property</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <Alert variant="destructive">
              {error}
            </Alert>
          )}

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Tell us about your property</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Title</label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Beautiful 3BR Apartment in Downtown"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your property in detail..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <Select onValueChange={handleSelectChange('propertyType')} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="e.g., $500,000 or €300,000"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location
              </CardTitle>
              <CardDescription>Where is your property located?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <Select onValueChange={handleSelectChange('country')} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCountries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.flag} {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g., New York"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address (Optional)</label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="e.g., 123 Main Street"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
              <CardDescription>Specific details about your property</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                  <div className="relative">
                    <Bed className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="bedrooms"
                      type="number"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      placeholder="0"
                      className="pl-10"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                  <div className="relative">
                    <Bath className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="bathrooms"
                      type="number"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      placeholder="0"
                      className="pl-10"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
                  <div className="relative">
                    <Square className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      placeholder="e.g., 120 sqm"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>How can interested buyers reach you?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <Input
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input
                    name="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    placeholder={user.email}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Images
              </CardTitle>
              <CardDescription>Add image URLs for your property</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1"
                />
                <Button type="button" onClick={addImage} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {formData.images.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Added Images:</p>
                  {formData.images.map((image, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <img src={image} alt={`Property ${index + 1}`} className="w-12 h-12 object-cover rounded" />
                      <span className="flex-1 text-sm truncate">{image}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeImage(image)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
              <CardDescription>Add tags to help buyers find your property</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="e.g., Modern, Furnished, Near Metro"
                  className="flex-1"
                />
                <Button type="button" onClick={addTag} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
              <CardDescription>What amenities does your property offer?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {amenitiesList.map((amenity) => (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`p-2 text-sm rounded border transition-colors ${
                      formData.amenities.includes(amenity)
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-4">
            <Link href="/dashboard" className="flex-1">
              <Button type="button" variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? 'Posting Property...' : 'Post Property'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}




