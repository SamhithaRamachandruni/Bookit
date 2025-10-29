'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBooking, validatePromo } from '@/services/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import Header from '@/components/Header';

export default function Checkout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('bookingData');
    if (data) {
      setBookingData(JSON.parse(data));
    } else {
      router.push('/');
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;

    try {
      setPromoError('');
      const result = await validatePromo(promoCode, bookingData.subtotal);
      
      if (result.valid) {
        setDiscount(result.discount);
        setPromoApplied(true);
      }
    } catch (error: any) {
      setPromoError(error.response?.data?.error || 'Invalid promo code');
      setDiscount(0);
      setPromoApplied(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      
      const total = bookingData.subtotal + bookingData.tax - discount;
      
      const booking = await createBooking({
        slotId: bookingData.slotId,
        userName: formData.name,
        userEmail: formData.email,
        quantity: bookingData.quantity,
        subtotal: bookingData.subtotal,
        tax: bookingData.tax,
        discount,
        total,
        promoCode: promoApplied ? promoCode : null,
      });

      localStorage.setItem('bookingConfirmation', JSON.stringify(booking));
      localStorage.removeItem('bookingData');
      router.push('/confirmation');
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  if (!bookingData) {
    return (
      <>
        <Header />
        <LoadingSpinner />
      </>
    );
  }

  const total = bookingData.subtotal + bookingData.tax - discount;

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Experience:</span>
              <span className="font-semibold">{bookingData.experienceTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-semibold">{bookingData.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="font-semibold">{bookingData.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Quantity:</span>
              <span className="font-semibold">{bookingData.quantity}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Information</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Promo Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value.toUpperCase());
                  setPromoError('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter promo code"
                disabled={promoApplied}
              />
              <button
                type="button"
                onClick={handleApplyPromo}
                disabled={promoApplied}
                className={`px-6 py-2 rounded-lg font-semibold ${
                  promoApplied
                    ? 'bg-green-500 text-white cursor-not-allowed'
                    : 'bg-primary text-secondary hover:bg-yellow-500'
                }`}
              >
                {promoApplied ? 'Applied' : 'Apply'}
              </button>
            </div>
            {promoError && <p className="text-red-500 text-sm mt-1">{promoError}</p>}
            {promoApplied && <p className="text-green-600 text-sm mt-1">Promo code applied!</p>}
          </div>

          <div className="border-t pt-4 mb-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{bookingData.subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Taxes</span>
              <span>₹{bookingData.tax}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>
            )}
          </div>

          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-secondary py-3 rounded-lg font-semibold hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </>
  );
}