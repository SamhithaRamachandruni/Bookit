# BookIt: Experiences & Slots

A fullstack web application for booking travel experiences with slot management.

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, TailwindCSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Sequelize ORM
- **Deployment**: Docker, Docker Compose

## Prerequisites

- Docker Desktop installed on your machine
- Docker Compose (comes with Docker Desktop)

## Quick Start (Docker Setup)

1. Clone the repository:
```bash
git clone https://github.com/SamhithaRamachandruni/Bookit
cd bookit
```

2. Start all services:
```bash
docker-compose up --build
```

This will:
- Start PostgreSQL database on port 5432
- Start Backend API on port 5000
- Start Frontend application on port 3000
- Automatically seed the database with sample data

3. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## Manual Setup (Without Docker)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your database credentials:
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/bookit
PORT=5000
```

5. Start the backend:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
cp .env.example .env.local
```

4. Update `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

5. Start the frontend:
```bash
npm run dev
```

## API Endpoints

- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get experience details with slots
- `POST /api/bookings` - Create a new booking
- `POST /api/promo/validate` - Validate promo code

## Promo Codes

- `SAVE10` - 10% discount
- `FLAT100` - ₹100 flat discount

## Project Structure

```
bookit/
├── backend/          # Express backend with TypeScript
├── frontend/         # Next.js frontend with TypeScript
└── docker-compose.yml
```

## Features

- Browse travel experiences
- View available dates and time slots
- Real-time slot availability
- Promo code validation
- Booking confirmation
- Responsive design (mobile-friendly)
- Dockerized setup for easy deployment

## Stopping Services

```bash
docker-compose down
```

To remove volumes as well:
```bash
docker-compose down -v
```

## Development

- Backend runs with hot-reload using nodemon
- Frontend runs with Next.js fast refresh
- Changes to code will automatically reload

## Deployment

The application can be deployed to:
- **Backend**: Render, Railway, AWS
- **Frontend**: Vercel, Netlify
- **Database**: Railway, Supabase, AWS RDS

## License

MIT
