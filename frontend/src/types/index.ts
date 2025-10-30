// src/types/index.ts

export interface Slot {
  id: string;
  date: string;            
  time: string;            
  availableSpots: number;  
  available: boolean;     
}

export interface Experience {
  id: string;
  title: string;
  name?: string;           
  description: string;
  location: string;
  duration?: string;
  rating?: number;
  slots: Slot[];


  basePrice: number;
  price?: number;

  image: string;
  imageUrl?: string;
}
