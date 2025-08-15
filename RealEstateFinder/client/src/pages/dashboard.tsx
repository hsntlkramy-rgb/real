import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Alert } from '../components/ui/alert';
import { 
  Plus, 
  Home, 
  Heart, 
  Settings, 
  LogOut, 
  Edit, 
  Trash2, 
  Eye,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Square
} from 'lucide-react';
import { Link, useLocation } from 'wouter';
import axios from 'axios';

interface Property {
  id: number;
  title: string;
  description: string;
  price: string;
  location: string;
  country: string;
  city?: string;
  propertyType: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
  images: string[];
  status: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      setLocation('/login');
      return;
    }
    fetchUserProperties();
  }, [user, setLocation]);

  const fetchUserProperties = async () => {
    if (!user) return;
    
    try {
      const response = await axios.get(`/api/users/${user.id}/properties`);
      setProperties(response.data);
    } catch (err: any) {
      setError('Failed to load your properties');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
                <Home className="h-6 w-6" />
                BlissMatch
              </Link>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                Dashboard
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-sm text-gray-600">
                Welcome, {user.fullName || user.username}!
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your properties and account</p>
        </div>

        <Tabs defaultValue="properties" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="properties" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Properties</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Favorites</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Properties Tab */}
          <TabsContent value="properties" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Your Properties</h2>
              <Link href="/post-property">
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Post New Property
                </Button>
              </Link>
            </div>

            {error && (
              <Alert variant="destructive">
                {error}
              </Alert>
            )}

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="text-gray-600 mt-4">Loading your properties...</p>
              </div>
            ) : properties.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Home className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Properties Yet</h3>
                  <p className="text-gray-600 mb-6">Start by posting your first property</p>
                  <Link href="/post-property">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Post Your First Property
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gray-200 relative">
                      {property.images[0] ? (
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Home className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                      <Badge 
                        className="absolute top-2 right-2"
                        variant={property.status === 'active' ? 'default' : 'secondary'}
                      >
                        {property.status}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-1">{property.title}</h3>
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span className="line-clamp-1">{property.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          <span className="font-semibold text-primary">{property.price}</span>
                        </div>
                        {(property.bedrooms || property.bathrooms || property.area) && (
                          <div className="flex items-center gap-4">
                            {property.bedrooms && (
                              <div className="flex items-center gap-1">
                                <Bed className="h-3 w-3" />
                                <span>{property.bedrooms}</span>
                              </div>
                            )}
                            {property.bathrooms && (
                              <div className="flex items-center gap-1">
                                <Bath className="h-3 w-3" />
                                <span>{property.bathrooms}</span>
                              </div>
                            )}
                            {property.area && (
                              <div className="flex items-center gap-1">
                                <Square className="h-3 w-3" />
                                <span>{property.area}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Other tabs content */}
          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle>Favorite Properties</CardTitle>
                <CardDescription>Properties you've liked during browsing</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Your favorite properties will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <p className="text-gray-600">{user.fullName || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Username</label>
                    <p className="text-gray-600">{user.username}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <p className="text-gray-600">{user.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Role</label>
                    <Badge variant="secondary">{user.role}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>Insights about your properties</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Property analytics and insights will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}




