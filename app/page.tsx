'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Calendar, ShoppingCart, FileText, Activity, BookOpen, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Home() {
  const [location, setLocation] = useState('Bangalore');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const popularSearches = ['Dermatologist', 'Pediatrician', 'Gynecologist/Obstetrician', 'Orthopedist'];

  // Filter suggestions based on search query
  const filteredSuggestions = popularSearches.filter(search =>
    search.toLowerCase().includes(searchQuery.toLowerCase()) && searchQuery.length > 0
  );

  const services = [
    { icon: Calendar, title: 'Consult with a doctor', description: 'Book appointments' },
    { icon: ShoppingCart, title: 'Order Medicines', description: 'Get medicines delivered' },
    { icon: FileText, title: 'View medical records', description: 'Access your records' },
    { icon: Activity, title: 'Book test', description: 'Lab tests & diagnostics', badge: 'New' },
    { icon: BookOpen, title: 'Read articles', description: 'Health insights' },
    { icon: Users, title: 'For healthcare providers', description: 'Join our network' }
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const params = new URLSearchParams({
        location: location,
        specialty: searchQuery
      });
      window.location.href = `/doctors?${params.toString()}`;
    }
  };

  const handlePopularSearch = (specialty: string) => {
    const params = new URLSearchParams({
      location: location,
      specialty: specialty
    });
    window.location.href = `/doctors?${params.toString()}`;
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    const params = new URLSearchParams({
      location: location,
      specialty: suggestion
    });
    window.location.href = `/doctors?${params.toString()}`;
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  const handleSearchInputFocus = () => {
    if (searchQuery.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleSearchInputBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-blue-600">practo</span>
              </Link>
              <nav className="hidden md:flex space-x-8">
                <Link href="/doctors" className="text-gray-700 hover:text-blue-600 font-medium border-b-2 border-blue-600 pb-1">
                  Find Doctors
                </Link>
                <Link href="/video-consult" className="text-gray-700 hover:text-blue-600 font-medium">
                  Video Consult
                </Link>
                <Link href="/surgeries" className="text-gray-700 hover:text-blue-600 font-medium">
                  Surgeries
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">NEW</span>
                  <span className="text-gray-700">For Corporates</span>
                </div>
                <span className="text-gray-700">For Providers</span>
                <span className="text-gray-700">Security & help</span>
              </div>
              <Button variant="outline" className="text-gray-700">
                Login / Signup
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400 rounded-full opacity-20"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-400 rounded-full opacity-30"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-400 rounded-full opacity-25"></div>
          <div className="absolute top-32 left-1/3 w-8 h-8 bg-orange-400 rounded-full opacity-20"></div>
          {/* Medical icons scattered */}
          <div className="absolute top-16 right-1/4 text-blue-300 opacity-30">
            <Activity size={24} />
          </div>
          <div className="absolute bottom-32 right-16 text-blue-300 opacity-30">
            <FileText size={20} />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8">
              Your home for health
            </h1>
            
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-semibold text-white mb-8">
                Find and Book
              </h2>
              
              {/* Search Form */}
              <div className="bg-white rounded-lg shadow-lg p-2 mb-8 relative">
                <div className="flex flex-col lg:flex-row gap-2">
                  <div className="flex items-center flex-1 px-4 py-3 border-r border-gray-200">
                    <MapPin className="text-gray-400 mr-3" size={20} />
                    <input
                      type="text"
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="flex-1 outline-none text-gray-700 placeholder-gray-400"
                    />
                  </div>
                  <div className="flex items-center flex-1 px-4 py-3 relative">
                    <Search className="text-gray-400 mr-3" size={20} />
                    <input
                      type="text"
                      placeholder="Search doctors, clinics, hospitals, etc."
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                      onFocus={handleSearchInputFocus}
                      onBlur={handleSearchInputBlur}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      className="flex-1 outline-none text-gray-700 placeholder-gray-400"
                    />
                    
                    {/* Search Suggestions Dropdown */}
                    {showSuggestions && filteredSuggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1">
                        {filteredSuggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-700 border-b border-gray-100 last:border-b-0"
                          >
                            <div className="flex items-center">
                              <Search className="text-gray-400 mr-3" size={16} />
                              <span>{suggestion}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button 
                    onClick={handleSearch}
                    className="lg:px-8 py-3 bg-blue-600 hover:bg-blue-700"
                  >
                    Search
                  </Button>
                </div>
              </div>

              {/* Popular Searches */}
              <div className="text-left">
                <span className="text-blue-100 mr-4">Popular searches:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {popularSearches.map((search) => (
                    <button
                      key={search}
                      onClick={() => handlePopularSearch(search)}
                      className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                    <service.icon className="text-blue-600" size={24} />
                  </div>
                  {service.badge && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      {service.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}