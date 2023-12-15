const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  uid: String, // Add this field to store user ID
  title: String,
  content: String,
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;