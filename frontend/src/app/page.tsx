'use client';

import { useEffect, useState } from 'react';
import { getExperiences } from '@/services/api';
import ExperienceCard from '@/components/ExperienceCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import Header from '@/components/Header';
import { Experience } from '@/types';

export default function Home() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const data = await getExperiences();
      setExperiences(data);
      setFilteredExperiences(data);
    } catch (err) {
      setError('Failed to load experiences. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredExperiences(experiences);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = experiences.filter(
      (exp) =>
        exp.title.toLowerCase().includes(lowercaseQuery) ||
        exp.location.toLowerCase().includes(lowercaseQuery) ||
        exp.description.toLowerCase().includes(lowercaseQuery)
    );
    setFilteredExperiences(filtered);
  };

  if (loading) {
    return (
      <>
        <Header onSearch={handleSearch} />
        <LoadingSpinner />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header onSearch={handleSearch} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header onSearch={handleSearch} />
      <div className="container mx-auto px-4 py-8">
        {filteredExperiences.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No experiences found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}