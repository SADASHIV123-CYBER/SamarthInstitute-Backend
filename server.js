const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

/* ========================
   🔐 Middleware
======================== */

// JSON parser
app.use(express.json());

// Security headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// CORS configuration (SAFE version)
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://samarth-institute-frontend.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // ✅ Allow instead of crashing server
      return callback(null, true);
    },
    credentials: true,
  })
);

/* ========================
   📦 Routes
======================== */

// Test route (VERY IMPORTANT for checking deploy)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Example API route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend working properly 🚀' });
});

/* ========================
   🚀 Server Start
======================== */

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...");

    if (!process.env.MONGO_URI) {
      throw new Error("❌ MONGO_URI is missing in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Startup Error:", error.message);
    process.exit(1); // crash properly so logs show error
  }
};

startServer();