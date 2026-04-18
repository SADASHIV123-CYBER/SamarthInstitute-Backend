const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
require('dotenv').config();

// ✅ IMPORT ROUTES (YOU MISSED THIS)
const authRoutes = require('./src/routes/auth.routes');
// import authRoutes from './src/routes/auth.routes.js'
const leadRoutes = require('./src/routes/lead.routes');
const attendanceRoutes = require('./src/routes/attendance.routes');
const testRoutes = require('./src/routes/test.routes');
const notesRoutes = require('./src/routes/notes.routes');
const userRoutes = require('./src/routes/user.routes');
const resultRoutes = require('./src/routes/result.routes');

const app = express();

/* ========================
   🔐 Middleware
======================== */

app.use(express.json());

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://samarth-institute-frontend.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      return callback(null, true);
    },
    credentials: true,
  })
);

/* ========================
   📦 Routes
======================== */

// ✅ TEST ROUTES
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend working properly 🚀' });
});

// ✅ REAL ROUTES (THIS WAS MISSING)
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/users', userRoutes);
app.use('/api/results', resultRoutes);

/* ========================
   🚀 Server Start
======================== */

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...");

    if (!process.env.MONGO_URI) {
      throw new Error("❌ MONGO_URI is missing");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Startup Error:", error.message);
    process.exit(1);
  }
};

startServer();