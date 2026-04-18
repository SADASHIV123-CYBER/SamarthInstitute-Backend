const notesService = require('../services/notes.service');
const { useCloudinary } = require('../config/cloudinary');
const path = require('path');

exports.uploadNote = async (req, res, next) => {
  try {
    console.log('File upload request received');
    console.log('File:', req.file);
    console.log('Body:', req.body);
    console.log('Use Cloudinary:', useCloudinary);
    
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No file uploaded' 
      });
    }

    let fileData;
    
    if (useCloudinary) {
      // Using Cloudinary
      fileData = {
        originalname: req.file.originalname || req.file.filename,
        path: req.file.path,
        mimetype: req.file.mimetype || 'application/octet-stream',
      };
    } else {
      // Using local disk storage
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      fileData = {
        originalname: req.file.originalname,
        path: `${baseUrl}/uploads/${req.file.filename}`,
        mimetype: req.file.mimetype,
        filename: req.file.filename,
      };
    }

    const note = await notesService.uploadNote(fileData, req.user.id);
    
    res.status(201).json({ 
      success: true, 
      note,
      message: 'File uploaded successfully'
    });
  } catch (err) {
    console.error('Upload error:', err);
    next(err);
  }
};

exports.getAllNotes = async (req, res, next) => {
  try {
    const notes = await notesService.getAllNotes();
    res.json({ success: true, notes });
  } catch (err) {
    next(err);
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    await notesService.deleteNote(req.params.id);
    res.json({ success: true, message: 'Note deleted' });
  } catch (err) {
    next(err);
  }
};