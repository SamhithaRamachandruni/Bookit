'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function Confirmation() {
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('bookingConfirmation');
    if (data) {
      setBooking(JSON.parse(data));
    } else {
      router.push('/');
    }
  }, [router]);

  if (!booking) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold mb-2">Booking Confirmed</h1>
          <p className="text-gray-600 mb-8">
            Ref ID: {booking.booking.referenceId}
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-8 text-left">
            <h2 className="font-semibold mb-4">Booking Details</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-semibold">{booking.booking.userName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-semibold">{booking.booking.userEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quantity:</span>
                <span className="font-semibold">{booking.booking.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Paid:</span>
                <span className="font-semibold">₹{booking.booking.total}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            A confirmation email has been sent to {booking.booking.userEmail}
          </p>

          <button
            onClick={() => {
              localStorage.removeItem('bookingConfirmation');
              router.push('/');
            }}
            className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    </>
  );
}