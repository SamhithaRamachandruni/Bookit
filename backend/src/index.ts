import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './config/database.js';
import experiencesRouter from './routes/experiences.js';
import bookingsRouter from './routes/bookings.js';
import promoRouter from './routes/promo.js';
import { seedDatabase } from './seeders/seed.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Smart & Flexible CORS Configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://boooooookit.vercel.app',
];

const vercelPattern = /\.vercel\.app$/;

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow requests like Postman

      if (allowedOrigins.includes(origin) || vercelPattern.test(origin)) {
        callback(null, true);
      } else {
        console.warn(`🚫 Blocked by CORS: ${origin}`);
        callback(new Error('Not allowed by CORS'), false);
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// ✅ Routes
app.use('/api/experiences', experiencesRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/promo', promoRouter);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Server is running',
    environment: process.env.NODE_ENV || 'development',
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'BookIt API Server',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      experiences: '/api/experiences',
      bookings: '/api/bookings',
      promo: '/api/promo',
    },
  });
});

// ✅ Start server and sync DB
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('✅ Database synchronized.');

    if (process.env.SEED_DATABASE === 'true') {
      await seedDatabase();
      console.log('🌱 Database seeded successfully.');
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();
