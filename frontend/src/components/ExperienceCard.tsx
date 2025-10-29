import Link from 'next/link';
import Image from 'next/image';
import { Experience } from '@/types';

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Link href={`/experiences/${experience.id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        <div className="relative w-full h-48">
          <Image
            src={experience.image}
            alt={experience.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold">{experience.title}</h3>
            <span className="text-sm text-gray-500">{experience.location}</span>
          </div>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {experience.description}
          </p>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-500">From </span>
              <span className="text-lg font-bold">₹{experience.basePrice}</span>
            </div>
            <button className="bg-primary text-secondary px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-500">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}