'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="relative w-12 h-12 mr-2">
            <Image
              src="https://play-lh.googleusercontent.com/RN3VChKk58axuJrmnu3-URZ5ZqcIll2hLjE0m4pdZsPnQJjjeMOVnZteKb0hRD1eYuo=w480-h960-rw"
              alt="Highway Delite"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xl font-semibold">highway delite</span>
        </Link>

        <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 max-w-md mx-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search experiences"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="bg-primary px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
}