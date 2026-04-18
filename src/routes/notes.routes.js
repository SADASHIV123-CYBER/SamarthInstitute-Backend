const express = require('express');
const multer = require('multer');
const { storage, useCloudinary } = require('../config/cloudinary');
const { uploadNote, getAllNotes, deleteNote } = require('../controllers/notes.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const router = express.Router();

// Configure multer with error handling
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images, PDFs, and documents are allowed.'));
    }
  }
});

// Serve static files from uploads directory (for local storage)
if (!useCloudinary) {
  router.use('/uploads', express.static('uploads'));
}

router.post('/', 
  protect, 
  authorize('admin'), 
  (req, res, next) => {
    upload.single('file')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ 
          success: false, 
          message: `Upload error: ${err.message}` 
        });
      } else if (err) {
        return res.status(400).json({ 
          success: false, 
          message: err.message 
        });
      }
      next();
    });
  },
  uploadNote
);

router.get('/', protect, getAllNotes);
router.delete('/:id', protect, authorize('admin'), deleteNote);

module.exports = router;