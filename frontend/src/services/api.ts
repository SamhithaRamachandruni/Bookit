import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getExperiences = async () => {
  const response = await api.get('/experiences');
  return response.data;
};

export const getExperienceById = async (id: string) => {
  const response = await api.get(`/experiences/${id}`);
  return response.data;
};

export const createBooking = async (bookingData: any) => {
  const response = await api.post('/bookings', bookingData);
  return response.data;
};

export const validatePromo = async (code: string, subtotal: number) => {
  const response = await api.post('/promo/validate', { code, subtotal });
  return response.data;
};