'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, MapPin, ChevronDown, Star, Clock, MapPinIcon, Phone, Calendar, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  location: string;
  clinic: string;
  consultationFee: number;
  rating: number;
  patientStories: number;
  image: string;
  availability: 'Available Today' | 'Available Tomorrow' | 'Available This Week';
  badge?: string;
}

export default function DoctorsPage() {
  const searchParams = useSearchParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(searchParams.get('location') || 'Jp Nagar');
  const [specialty, setSpecialty] = useState(searchParams.get('specialty') || 'Dermatologist');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('specialty') || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState({
    gender: 'All',
    experience: 'All',
    sortBy: 'Relevance'
  });

  const popularSearches = ['Dermatologist', 'Pediatrician', 'Gynecologist/Obstetrician', 'Orthopedist'];

  // Filter suggestions based on search query
  const filteredSuggestions = popularSearches.filter(search =>
    search.toLowerCase().includes(searchQuery.toLowerCase()) && searchQuery.length > 0
  );
  useEffect(() => {
    fetchDoctors();
  }, [location, specialty]);

  useEffect(() => {
    setSearchQuery(searchParams.get('specialty') || '');
  }, [searchParams]);
  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const searchTerm = searchQuery || specialty;
      const response = await fetch(`/api/doctors?location=${encodeURIComponent(location)}&specialty=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      setDoctors(data.doctors || []);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
      window.history.pushState({}, '', `/doctors?${params.toString()}`);
      fetchDoctors();
      setSpecialty(searchQuery);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setSpecialty(suggestion);
    setShowSuggestions(false);
    const params = new URLSearchParams({
      location: location,
      specialty: suggestion
    });
    window.history.pushState({}, '', `/doctors?${params.toString()}`);
    fetchDoctors();
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
    <div className="min-h-screen bg-gray-50">
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

      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4 relative">
            <div className="flex flex-1 bg-gray-50 rounded-lg overflow-hidden">
              <div className="flex items-center px-4 py-3 border-r border-gray-200 bg-white">
                <MapPin className="text-gray-400 mr-3" size={20} />
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                />
              </div>
              <div className="flex items-center flex-1 px-4 py-3 bg-white relative">
                <Search className="text-gray-400 mr-3" size={20} />
                <input
                  type="text"
                  placeholder="Search specialty"
                  value={specialty}
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
            </div>
            <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 px-8">
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2 cursor-pointer">
              <span>Gender</span>
              <ChevronDown size={16} />
            </div>
            <div className="flex items-center space-x-2 cursor-pointer">
              <span>Patient Stories</span>
              <ChevronDown size={16} />
            </div>
            <div className="flex items-center space-x-2 cursor-pointer">
              <span>Experience</span>
              <ChevronDown size={16} />
            </div>
            <div className="flex items-center space-x-2 cursor-pointer">
              <span>All Filters</span>
              <ChevronDown size={16} />
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <span>Sort By</span>
              <div className="flex items-center space-x-2 cursor-pointer">
                <span>Relevance</span>
                <ChevronDown size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {doctors.length} {searchQuery || specialty}s available in {location}, Bangalore
          </h1>
          <div className="flex items-center text-gray-600">
            <CheckCircle className="mr-2" size={20} />
            <span>Book appointments with minimum wait-time & verified doctor details</span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {doctors.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                        {doctor.badge && (
                          <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                            {doctor.badge}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
                        <div className="space-y-2">
                          <h2 className="text-xl font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
                            {doctor.name}
                          </h2>
                          <p className="text-gray-600">{doctor.specialty}</p>
                          <p className="text-gray-600">{doctor.experience}</p>
                          <div className="flex items-center text-gray-600">
                            <MapPinIcon className="mr-1" size={16} />
                            <span>{doctor.location} • {doctor.clinic}</span>
                          </div>
                          <p className="font-semibold">₹{doctor.consultationFee} Consultation fee at clinic</p>
                          
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <div className="bg-green-500 text-white text-xs px-2 py-1 rounded flex items-center">
                                <span>👍</span>
                                <span className="ml-1">{doctor.rating}%</span>
                              </div>
                              <span className="ml-2 text-gray-600 text-sm underline cursor-pointer">
                                {doctor.patientStories} Patient Stories
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end space-y-3">
                          {doctor.availability === 'Available Today' && (
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="mr-2" size={16} />
                              <span className="text-sm font-medium">Available Today</span>
                            </div>
                          )}
                          
                          <Button className="bg-blue-500 hover:bg-blue-600 px-6">
                            Book Clinic Visit
                            {doctor.availability === 'Available Today' && (
                              <div className="text-xs">No Booking Fee</div>
                            )}
                          </Button>
                          
                          <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                            <Phone className="mr-2" size={16} />
                            Contact Clinic
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}