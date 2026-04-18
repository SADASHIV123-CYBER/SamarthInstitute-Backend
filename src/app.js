const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const authRoutes = require('./routes/auth.routes');
const leadRoutes = require('./routes/lead.routes');
const attendanceRoutes = require('./routes/attendance.routes');
const testRoutes = require('./routes/test.routes');
const notesRoutes = require('./routes/notes.routes');
const userRoutes = require('./routes/user.routes');
const resultRoutes = require('./routes/result.routes');
const { errorHandler } = require('./middleware/error.middleware');

const app = express();

/* ========================
   🔐 Middleware
======================== */

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// CORS (allow frontend)
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://samarth-institute-frontend.vercel.app',
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ========================
   📁 Static Files
======================== */

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

/* ========================
   🚀 API Routes
======================== */

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/users', userRoutes);
app.use('/api/results', resultRoutes);

/* ========================
   ❌ REMOVE frontend serving
   (You are using Vercel)
======================== */

// ❌ DO NOT add app.get('*') here
// ❌ DO NOT serve React from backend

/* ========================
   ⚠️ Error Handler
======================== */

app.use(errorHandler);

module.exports = app;