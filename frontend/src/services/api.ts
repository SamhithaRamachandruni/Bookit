// src/services/api.ts
import axios from 'axios';
import { Experience } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getExperiences = async (): Promise<Experience[]> => {
  const response = await api.get('/experiences');
  return response.data as Experience[];
};

export const getExperienceById = async (id: string): Promise<Experience> => {
  const response = await api.get(`/experiences/${id}`);
  return response.data as Experience;
};

export const createBooking = async (bookingData: any) => {
  const response = await api.post('/bookings', bookingData);
  return response.data;
};

export interface PromoResponse {
  valid: boolean;
  discount: number;
}

export const validatePromo = async (
  code: string,
  subtotal: number
): Promise<PromoResponse> => {
  const response = await api.post('/promo/validate', { code, subtotal });
  return response.data as PromoResponse;
};
