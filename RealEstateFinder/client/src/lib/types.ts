export interface QuizQuestion {
  question: string;
  options: {
    text: string;
    scores: {
      remoteWorker?: number;
      family?: number;
      investor?: number;
      retiree?: number;
      luxury?: number;
    };
  }[];
}

export interface UserPersonas {
  remoteWorker: number;
  family: number;
  investor: number;
  retiree: number;
  luxury: number;
}

export interface PropertyWithScore {
  id: number;
  title: string;
  description: string;
  price: string;
  location: string;
  country: string;
  images: string[];
  img_url: string;
  tags: string[];
  personas: {
    remoteWorker: number;
    family: number;
    investor: number;
    retiree: number;
    luxury: number;
  };
  latitude: number;
  longitude: number;
  isActive: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
  matchScore?: number;
  bedrooms?: number;
  bathrooms?: number;
  type?: string;
  contactUrl?: string;
  lister_url?: string;
  contactPhone?: string;
  contactEmail?: string;
}

export interface UserStats {
  totalSeen: number;
  totalLiked: number;
  matchRate: number;
}
