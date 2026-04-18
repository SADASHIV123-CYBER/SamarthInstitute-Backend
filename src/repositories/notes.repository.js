const Notes = require('../models/Notes');

class NotesRepository {
  async create(notesData) {
    return await Notes.create(notesData);
  }

  async findAll() {
    return await Notes.find().sort('-createdAt');
  }

  async findById(id) {
    return await Notes.findById(id);
  }

  async delete(id) {
    return await Notes.findByIdAndDelete(id);
  }
}

module.exports = new NotesRepository();