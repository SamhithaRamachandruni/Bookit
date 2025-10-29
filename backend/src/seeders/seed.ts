import { Experience } from '../models/Experience';
import { Slot } from '../models/Slot';

const experiencesData = [
  {
    title: 'Kayaking',
    location: 'Udupi',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    basePrice: 999,
  },
  {
    title: 'Nandi Hills Sunrise',
    location: 'Bangalore',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    basePrice: 899,
  },
  {
    title: 'Coffee Trail',
    location: 'Coorg',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800',
    basePrice: 1299,
  },
  {
    title: 'Kayaking',
    location: 'Udupi, Karnataka',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    image: 'https://images.unsplash.com/photo-1502933691298-84fc14542831?w=800',
    basePrice: 999,
  },
  {
    title: 'Boat Cruise',
    location: 'Sunderban',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800',
    basePrice: 999,
  },
  {
    title: 'Bunjee Jumping',
    location: 'Manali',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800',
    basePrice: 999,
  },
  {
    title: 'Coffee Trail',
    location: 'Coorg',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    image: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=800',
    basePrice: 1299,
  },
];

const generateSlots = (experienceId: number) => {
  const slots = [];
  const dates = ['Oct 22', 'Oct 23', 'Oct 24', 'Oct 25', 'Oct 26'];
  const times = [
    { time: '07:00 am', spots: 4 },
    { time: '09:00 am', spots: 2 },
    { time: '11:00 am', spots: 5 },
    { time: '01:00 pm', spots: 0 },
  ];

  for (const date of dates) {
    for (const { time, spots } of times) {
      slots.push({
        experienceId,
        date,
        time,
        availableSpots: spots,
        totalSpots: 10,
      });
    }
  }

  return slots;
};

export const seedDatabase = async () => {
  try {
    const experienceCount = await Experience.count();
    
    if (experienceCount > 0) {
      console.log('Database already seeded. Skipping...');
      return;
    }

    console.log('Seeding database...');

    // Create experiences
    for (const expData of experiencesData) {
      const experience = await Experience.create(expData);
      const slots = generateSlots(experience.id);
      await Slot.bulkCreate(slots as any);
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};