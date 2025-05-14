export interface Activity {
  id: string;
  name: string;
  image: string;
  description: string;
  features: string[];
  duration: string;
  difficulty: string;
  price: number; // Ensure this is number if backend sends number
  location: string;
  isActive?: boolean; // Optional if you manage this
}