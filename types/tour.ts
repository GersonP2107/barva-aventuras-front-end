export interface TourItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface Tour {
  id: string;
  title: string;
  image: string;
  description: string;
  duration: string;
  difficulty: string;
  price: string;
  destination: string;
  features: string[];
  itinerary: TourItineraryDay[];
  included: string[];
  notIncluded: string[];
  recommendations: string[];
  isActive: boolean;
}