const notesRepository = require('../repositories/notes.repository');

class NotesService {
  async uploadNote(fileData, uploadedBy) {
    console.log('Uploading note with data:', fileData);
    
    const noteData = {
      title: fileData.originalname,
      description: '',
      fileUrl: fileData.path,
      fileType: fileData.mimetype,
      uploadedBy,
    };
    
    return await notesRepository.create(noteData);
  }

  async getAllNotes() {
    return await notesRepository.findAll();
  }

  async deleteNote(id) {
    return await notesRepository.delete(id);
  }
}

module.exports = new NotesService();