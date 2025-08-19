import React from 'react';
import { Link } from 'wouter';
import { MapPin, Heart, ArrowRight, Building2, Globe, Shield } from 'lucide-react';

export default function HomeSimplePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">🏠 RealEstateFinder</h1>
            <div className="flex items-center space-x-4">
              <Link href="/auth" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign In
              </Link>
              <Link href="/auth" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Find Your Dream Property
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover amazing properties across UAE, UK, and Cyprus. Use our interactive map, 
            swipe interface, and smart search to find the perfect home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/map" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
              <MapPin className="w-6 h-6 mr-2 inline" />
              Explore on Map
            </Link>
            <Link href="/swipe" className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors">
              <Heart className="w-6 h-6 mr-2 inline" />
              Start Swiping
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg p-8 text-center shadow-lg">
            <Building2 className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">410+ Properties</h3>
            <p className="text-gray-600">Across multiple countries</p>
          </div>
          <div className="bg-white rounded-lg p-8 text-center shadow-lg">
            <Globe className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">3 Countries</h3>
            <p className="text-gray-600">UAE, UK, and Cyprus</p>
          </div>
          <div className="bg-white rounded-lg p-8 text-center shadow-lg">
            <Shield className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Secure Platform</h3>
            <p className="text-gray-600">Safe and reliable</p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">Why Choose RealEstateFinder?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-4 text-blue-600">🌍 Multi-Country Properties</h4>
              <p className="text-gray-600 mb-4">
                Access properties from UAE, UK, and Cyprus all in one platform. 
                Find your perfect home regardless of location.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4 text-green-600">🗺️ Interactive Map</h4>
              <p className="text-gray-600 mb-4">
                Explore properties on an interactive map with real-time filtering. 
                See exactly where each property is located.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4 text-purple-600">💫 Swipe Interface</h4>
              <p className="text-gray-600 mb-4">
                Use our Tinder-like swipe interface to quickly browse through properties. 
                Like or pass with a simple gesture.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4 text-orange-600">🔐 User Accounts</h4>
              <p className="text-gray-600 mb-4">
                Create an account to save favorites, track your search history, 
                and get personalized recommendations.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6">Ready to Get Started?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/map" className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors">
              <MapPin className="w-5 h-5 mr-2 inline" />
              View Properties on Map
            </Link>
            <Link href="/swipe" className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors">
              <ArrowRight className="w-5 h-5 mr-2 inline" />
              Start Swiping Properties
            </Link>
            <Link href="/auth" className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors">
              <Shield className="w-5 h-5 mr-2 inline" />
              Create Account
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 RealEstateFinder. All rights reserved.</p>
          <p className="text-gray-400 mt-2">Find your dream property across UAE, UK, and Cyprus</p>
        </div>
      </div>
    </div>
  );
}
