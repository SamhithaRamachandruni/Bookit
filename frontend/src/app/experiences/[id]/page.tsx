'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { getExperienceById } from '@/services/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import Header from '@/components/Header';
import { Experience, Slot } from '@/types';

export default function ExperienceDetails() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      fetchExperience();
    }
  }, [id]);

  const fetchExperience = async () => {
    try {
      setLoading(true);
      const data = await getExperienceById(id);
      setExperience(data);
      
      // Set first available date
      if (data.slots && data.slots.length > 0) {
        const firstDate = data.slots[0].date;
        setSelectedDate(firstDate);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <LoadingSpinner />
      </>
    );
  }

  if (!experience) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-8">Experience not found</div>
      </>
    );
  }

  const availableDates = Array.from(new Set(experience.slots?.map(slot => slot.date) || []));
  const slotsForSelectedDate = experience.slots?.filter(slot => slot.date === selectedDate) || [];

  const subtotal = experience.basePrice * quantity;
  const tax = Math.floor(subtotal * 0.06);
  const total = subtotal + tax;

  const handleConfirm = () => {
    if (!selectedSlot) {
      alert('Please select a time slot');
      return;
    }

    const bookingData = {
      experienceId: experience.id,
      experienceTitle: experience.title,
      slotId: selectedSlot.id,
      date: selectedDate,
      time: selectedSlot.time,
      quantity,
      basePrice: experience.basePrice,
      subtotal,
      tax,
      total,
    };

    localStorage.setItem('bookingData', JSON.stringify(bookingData));
    router.push('/checkout');
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 mb-6 hover:text-gray-800"
        >
          <span className="mr-2">←</span> Details
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative w-full h-96 rounded-lg overflow-hidden mb-6">
              <Image
                src={experience.image}
                alt={experience.title}
                fill
                className="object-cover"
              />
            </div>

            <h1 className="text-3xl font-bold mb-2">{experience.title}</h1>
            <p className="text-gray-600 mb-6">{experience.description}</p>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Choose date</h2>
              <div className="flex gap-3 flex-wrap">
                {availableDates.map((date) => (
                  <button
                    key={date}
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedSlot(null);
                    }}
                    className={`px-6 py-2 rounded-lg border ${
                      selectedDate === date
                        ? 'bg-primary border-primary text-secondary font-semibold'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Choose time</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {slotsForSelectedDate.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot)}
                    disabled={slot.availableSpots === 0}
                    className={`px-4 py-3 rounded-lg border text-sm ${
                      slot.availableSpots === 0
                        ? 'bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed'
                        : selectedSlot?.id === slot.id
                        ? 'bg-primary border-primary text-secondary font-semibold'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div>{slot.time}</div>
                    <div className="text-xs mt-1">
                      {slot.availableSpots === 0 ? 'Sold out' : `${slot.availableSpots} left`}
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                All times are in IST (GMT +5:30)
              </p>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">About</h3>
              <p className="text-sm text-gray-600">
                Scenic routes, trained guides, and safety briefing. Minimum age 10.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-lg sticky top-4">
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">Starts at</div>
                <div className="text-2xl font-bold">₹{experience.basePrice}</div>
              </div>

              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">Quantity</div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="border-t pt-4 mb-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taxes</span>
                  <span>₹{tax}</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <button
                onClick={handleConfirm}
                disabled={!selectedSlot}
                className={`w-full py-3 rounded-lg font-semibold ${
                  selectedSlot
                    ? 'bg-primary text-secondary hover:bg-yellow-500'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}