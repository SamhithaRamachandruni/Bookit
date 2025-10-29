// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';

// dotenv.config();

// const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/bookit';

// export const sequelize = new Sequelize(DATABASE_URL, {
//   dialect: 'postgres',
//   logging: false,
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// });


import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Railway provides DATABASE_URL automatically
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/bookit';

export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' 
      ? {
          require: true,
          rejectUnauthorized: false // Railway uses self-signed certificates
        }
      : false
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});