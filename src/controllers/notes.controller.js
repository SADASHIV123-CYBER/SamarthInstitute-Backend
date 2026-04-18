const notesService = require('../services/notes.service');

exports.uploadNote = async (req, res, next) => {
  try {
    const note = await notesService.uploadNote(req.file, req.user.id);
    res.status(201).json({ success: true, note });
  } catch (err) {
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