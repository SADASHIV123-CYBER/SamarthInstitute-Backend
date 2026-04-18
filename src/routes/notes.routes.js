const express = require('express');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const { uploadNote, getAllNotes, deleteNote } = require('../controllers/notes.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const router = express.Router();

const upload = multer({ storage });

router.post('/', protect, authorize('admin'), upload.single('file'), uploadNote);
router.get('/', protect, getAllNotes);
router.delete('/:id', protect, authorize('admin'), deleteNote);

module.exports = router;