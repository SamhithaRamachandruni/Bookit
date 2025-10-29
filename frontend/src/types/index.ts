// src/types/index.ts

export interface Slot {
  id: string;
  time: string;
  available: boolean;
}

export interface Experience {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  location: string;
  duration: string;
  rating: number;
  slots: Slot[];
}
