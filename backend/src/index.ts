// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { sequelize } from './config/database';
// import experiencesRouter from './routes/experiences';
// import bookingsRouter from './routes/bookings';
// import promoRouter from './routes/promo';
// import { seedDatabase } from './seeders/seed';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/experiences', experiencesRouter);
// app.use('/api/bookings', bookingsRouter);
// app.use('/api/promo', promoRouter);

// app.get('/api/health', (req, res) => {
//   res.json({ status: 'ok', message: 'Server is running' });
// });

// // Initialize database and start server
// const startServer = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Database connection established successfully.');

//     await sequelize.sync({ alter: true });
//     console.log('Database synchronized.');

//     // Seed database
//     await seedDatabase();

//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//     process.exit(1);
//   }
// };

// startServer();


import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './config/database';
import experiencesRouter from './routes/experiences';
import bookingsRouter from './routes/bookings';
import promoRouter from './routes/promo';
import { seedDatabase } from './seeders/seed';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for Railway
const allowedOrigins = process.env.FRONTEND_URL 
  ? [process.env.FRONTEND_URL, 'https://boooooookit-new.vercel.app', 'http://localhost:3000']
  : ['https://boooooookit-new.vercel.app', 'http://localhost:3000'];


app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/experiences', experiencesRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/promo', promoRouter);

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'BookIt API Server',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      experiences: '/api/experiences',
      bookings: '/api/bookings',
      promo: '/api/promo'
    }
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Sync database (be careful with this in production)
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('Database synchronized.');

    // Seed database only if SEED_DATABASE env var is set
    if (process.env.SEED_DATABASE === 'true') {
      await seedDatabase();
      console.log('Database seeded successfully.');
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();