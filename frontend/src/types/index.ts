// src/types/index.ts

export interface Slot {
  id: string;
  date:string;
  time: string;
  available: boolean;
}

export interface Experience {
  title: any;
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  location: string;
  duration: string;
  rating: number;
  slots: Slot[];
  basePrice: number;
}
