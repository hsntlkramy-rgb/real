import React, { useState } from 'react';
import { Link } from 'wouter';
import { LoginForm } from '../components/auth/login-form';
import { RegisterForm } from '../components/auth/register-form';
import { Home, ArrowLeft } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any email/password combination
      if (email && password) {
        // Store user info in localStorage (in real app, use proper auth)
        localStorage.setItem('user', JSON.stringify({
          email,
          name: email.split('@')[0],
          isLoggedIn: true
        }));
        
        // Redirect to home page
        window.location.href = '/realestat/';
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (name: string, email: string, phone: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any valid registration
      if (name && email && phone && password) {
        // Store user info in localStorage (in real app, use proper auth)
        localStorage.setItem('user', JSON.stringify({
          email,
          name,
          phone,
          isLoggedIn: true
        }));
        
        // Redirect to home page
        window.location.href = '/realestat/';
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
              <Home className="w-5 h-5 mr-2" />
              RealEstateFinder
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {isLogin ? 'Welcome Back' : 'Join Our Community'}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {isLogin 
                ? 'Sign in to access your personalized property recommendations and save your favorites.'
                : 'Create an account to get personalized property recommendations, save favorites, and track your search history.'
              }
            </p>
          </div>

          {/* Auth Forms */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Form */}
            <div>
              {isLogin ? (
                <LoginForm
                  onSwitchToRegister={() => setIsLogin(false)}
                  onLogin={handleLogin}
                  isLoading={isLoading}
                />
              ) : (
                <RegisterForm
                  onSwitchToLogin={() => setIsLogin(true)}
                  onRegister={handleRegister}
                  isLoading={isLoading}
                />
              )}
            </div>

            {/* Right Column - Features */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Why Choose RealEstateFinder?
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Multi-Country Properties</h4>
                    <p className="text-gray-600 text-sm">
                      Access properties from UAE, UK, Cyprus, and more countries in one platform.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Smart Recommendations</h4>
                    <p className="text-gray-600 text-sm">
                      Get personalized property suggestions based on your preferences and search history.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Interactive Map & Swipe</h4>
                    <p className="text-gray-600 text-sm">
                      Explore properties on an interactive map or use our Tinder-like swipe interface.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-orange-600 font-semibold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Save & Compare</h4>
                    <p className="text-sm text-gray-600">
                      Save your favorite properties and compare them side by side to make informed decisions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Demo Mode:</strong> This is a demonstration application. 
                  Any email and password combination will work for login, and any valid registration data will create an account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
