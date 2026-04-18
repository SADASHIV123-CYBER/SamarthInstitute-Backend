const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

// ... other imports

const app = express();

// CORS configuration – allow your Vercel frontend
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://samarth-institute-frontend.vercel.app',  // 👈 Add this
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// ... rest of your app.js