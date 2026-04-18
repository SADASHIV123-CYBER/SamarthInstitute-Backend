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

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" } // Allow loading resources from different origins
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/users', userRoutes);
app.use('/api/results', resultRoutes);

// Serve static files in production (optional)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });
}

app.use(errorHandler);

module.exports = app;