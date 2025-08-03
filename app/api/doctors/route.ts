import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Mock data for doctors
const mockDoctors = [
  {
    id: 1,
    name: 'Aesthetic Heart Dermatology & Cardiology Clinic',
    specialty: '1 Dermatologist',
    experience: '11 - 13 years experience',
    location: 'Jayanagar',
    clinic: 'Aesthetic Heart Dermatology & Cardiology Clinic',
    consultationFee: 800,
    rating: 97,
    patientStories: 159,
    image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    availability: 'Available Today' as const,
    badge: 'AD'
  },
  {
    id: 2,
    name: 'Dr. Sheelavathi Natraj',
    specialty: 'Dermatologist',
    experience: '21 years experience overall',
    location: 'JP Nagar, Bangalore',
    clinic: 'Sapphire Skin And Aesthetics Clinic + 1 more',
    consultationFee: 800,
    rating: 94,
    patientStories: 1506,
    image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    availability: 'Available Today' as const
  },
  {
    id: 3,
    name: 'Dr. Rajesh Kumar',
    specialty: 'Dermatologist',
    experience: '15 years experience overall',
    location: 'JP Nagar, Bangalore',
    clinic: 'Skin Care Center',
    consultationFee: 600,
    rating: 92,
    patientStories: 842,
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    availability: 'Available Tomorrow' as const
  },
  {
    id: 4,
    name: 'Dr. Priya Sharma',
    specialty: 'Dermatologist',
    experience: '8 years experience overall',
    location: 'JP Nagar, Bangalore',
    clinic: 'Derma Plus Clinic',
    consultationFee: 700,
    rating: 96,
    patientStories: 623,
    image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    availability: 'Available Today' as const
  },
  {
    id: 5,
    name: 'Dr. Amit Gupta',
    specialty: 'Dermatologist',
    experience: '12 years experience overall',
    location: 'JP Nagar, Bangalore',
    clinic: 'Advanced Skin Solutions',
    consultationFee: 900,
    rating: 95,
    patientStories: 1123,
    image: 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    availability: 'Available This Week' as const
  }
];

// Mock data for other specialties
const otherSpecialties = {
  'Pediatrician': [
    {
      id: 6,
      name: 'Dr. Sarah Johnson',
      specialty: 'Pediatrician',
      experience: '10 years experience overall',
      location: 'JP Nagar, Bangalore',
      clinic: 'Children\'s Health Center',
      consultationFee: 500,
      rating: 98,
      patientStories: 2156,
      image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      availability: 'Available Today' as const
    },
    {
      id: 9,
      name: 'Dr. Ravi Kumar',
      specialty: 'Pediatrician',
      experience: '15 years experience overall',
      location: 'Bangalore',
      clinic: 'Kids Care Clinic',
      consultationFee: 600,
      rating: 95,
      patientStories: 1834,
      image: 'https://images.pexels.com/photos/6129020/pexels-photo-6129020.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      availability: 'Available Today' as const
    },
    {
      id: 10,
      name: 'Dr. Anjali Reddy',
      specialty: 'Pediatrician',
      experience: '12 years experience overall',
      location: 'Bangalore',
      clinic: 'Little Angels Pediatric Center',
      consultationFee: 550,
      rating: 97,
      patientStories: 1456,
      image: 'https://images.pexels.com/photos/5452273/pexels-photo-5452273.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      availability: 'Available Tomorrow' as const
    }
  ],
  'Gynecologist/Obstetrician': [
    {
      id: 7,
      name: 'Dr. Meera Patel',
      specialty: 'Gynecologist/Obstetrician',
      experience: '18 years experience overall',
      location: 'JP Nagar, Bangalore',
      clinic: 'Women\'s Care Clinic',
      consultationFee: 800,
      rating: 96,
      patientStories: 1834,
      image: 'https://images.pexels.com/photos/5452273/pexels-photo-5452273.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      availability: 'Available Today' as const
    },
    {
      id: 11,
      name: 'Dr. Sunita Sharma',
      specialty: 'Gynecologist/Obstetrician',
      experience: '22 years experience overall',
      location: 'Bangalore',
      clinic: 'Motherhood Hospital',
      consultationFee: 900,
      rating: 98,
      patientStories: 2567,
      image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      availability: 'Available Today' as const
    },
    {
      id: 12,
      name: 'Dr. Kavitha Nair',
      specialty: 'Gynecologist/Obstetrician',
      experience: '14 years experience overall',
      location: 'Bangalore',
      clinic: 'Women\'s Wellness Center',
      consultationFee: 750,
      rating: 94,
      patientStories: 1234,
      image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      availability: 'Available This Week' as const
    }
  ],
  'Orthopedist': [
    {
      id: 8,
      name: 'Dr. Vikram Singh',
      specialty: 'Orthopedist',
      experience: '16 years experience overall',
      location: 'JP Nagar, Bangalore',
      clinic: 'Bone & Joint Center',
      consultationFee: 1000,
      rating: 93,
      patientStories: 967,
      image: 'https://images.pexels.com/photos/6129020/pexels-photo-6129020.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      availability: 'Available Tomorrow' as const
    },
    {
      id: 13,
      name: 'Dr. Arjun Gupta',
      specialty: 'Orthopedist',
      experience: '20 years experience overall',
      location: 'Bangalore',
      clinic: 'Advanced Orthopedic Care',
      consultationFee: 1200,
      rating: 96,
      patientStories: 1876,
      image: 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      availability: 'Available Today' as const
    },
    {
      id: 14,
      name: 'Dr. Ramesh Iyer',
      specialty: 'Orthopedist',
      experience: '18 years experience overall',
      location: 'Bangalore',
      clinic: 'Spine & Joint Clinic',
      consultationFee: 1100,
      rating: 95,
      patientStories: 1543,
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      availability: 'Available Tomorrow' as const
    }
  ]
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location') || 'JP Nagar';
    const specialty = searchParams.get('specialty') || 'Dermatologist';

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let doctors = mockDoctors;
    
    // If not dermatologist, use other specialties data
    if (specialty !== 'Dermatologist' && otherSpecialties[specialty as keyof typeof otherSpecialties]) {
      doctors = otherSpecialties[specialty as keyof typeof otherSpecialties];
    } else if (specialty === 'Dermatologist') {
      doctors = mockDoctors;
    } else {
      // For any other specialty not in our mock data, return empty array
      doctors = [];
    }

    // Filter doctors based on location (simple contains check)
    const filteredDoctors = doctors.length > 0 ? doctors.filter(doctor => 
      doctor.location.toLowerCase().includes(location.toLowerCase()) ||
      location.toLowerCase().includes(doctor.location.toLowerCase()) ||
      doctor.location.toLowerCase().includes('bangalore')
    ) : [];

    return NextResponse.json({
      success: true,
      doctors: filteredDoctors,
      total: filteredDoctors.length,
      location,
      specialty
    });
  } catch (error) {
    console.error('Error in doctors API:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}