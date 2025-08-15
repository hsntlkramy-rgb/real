import axios from 'axios';

// Define supported countries and their codes
export const NESTORIA_COUNTRIES = {
  uk: 'United Kingdom',
  es: 'Spain',
  it: 'Italy',
  fr: 'France',
  de: 'Germany',
  br: 'Brazil',
  ar: 'Argentina'
} as const;

export type NestoriaCountry = keyof typeof NESTORIA_COUNTRIES;

// Interface for property filters
export interface PropertyFilters {
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  propertyType?: string;
}

// Interface for Nestoria API response
interface NestoriaResponse {
  response: {
    application_response_code: string;
    total_results: number;
    page: number;
    total_pages: number;
    listings: Array<{
      title: string;
      price: number;
      price_formatted: string;
      latitude: number;
      longitude: number;
      img_url: string;
      thumb_url: string;
      bedroom_number: number;
      bathroom_number: number;
      property_type: string;
      summary: string;
    }>;
  };
}

// Custom error class for Nestoria API errors
export class NestoriaError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'NestoriaError';
  }
}

// Function to fetch property listings from Nestoria API
export async function fetchNestoriaListings(
  country: NestoriaCountry, 
  placeName: string,
  filters: PropertyFilters = {}
) {
  try {
    // Construct API parameters including filters
    const params: Record<string, any> = {
      action: 'search_listings',
      encoding: 'json',
      place_name: placeName,
      listing_type: 'buy',
      pretty: '1',
      number_of_results: 50
    };

    // Add optional filter parameters
    if (filters.minPrice) params.min_price = filters.minPrice;
    if (filters.maxPrice) params.max_price = filters.maxPrice;
    if (filters.minBedrooms) params.min_bedroom = filters.minBedrooms;
    if (filters.maxBedrooms) params.max_bedroom = filters.maxBedrooms;
    if (filters.propertyType) params.property_type = filters.propertyType;

    const response = await axios.get<NestoriaResponse>(
      `https://api.nestoria.${country}/api`,
      { params }
    );

    // Check for API-level errors
    const { application_response_code, listings } = response.data.response;
    
    // Response codes: 100-110 are successful
    if (!application_response_code.startsWith('1')) {
      throw new NestoriaError('No results found', application_response_code);
    }

    if (!listings || listings.length === 0) {
      throw new NestoriaError('No properties found for the given criteria');
    }

    return listings.map(listing => ({
      title: listing.title,
      price: listing.price,
      priceFormatted: listing.price_formatted,
      latitude: listing.latitude,
      longitude: listing.longitude,
      imageUrl: listing.img_url,
      thumbnailUrl: listing.thumb_url,
      bedrooms: listing.bedroom_number,
      bathrooms: listing.bathroom_number,
      propertyType: listing.property_type,
      summary: listing.summary
    }));
  } catch (error) {
    if (error instanceof NestoriaError) {
      throw error;
    }
    if (axios.isAxiosError(error)) {
      throw new NestoriaError(
        error.response?.data?.message || 'Failed to fetch property listings',
        error.response?.status?.toString()
      );
    }
    throw new NestoriaError('An unexpected error occurred');
  }
} 