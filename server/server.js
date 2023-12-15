// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db');
const Note = require('./note');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Define API routes

// Get all notes
app.get('/api/notes', async (req, res) => {
  const { uid } = req.query;
  try {
    // Filter notes based on uid
    const notes = await Note.find({ uid });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new note
app.post('/api/notes', async (req, res) => {
  const { uid, title, content } = req.body;

  try {
    const newNote = new Note({ uid, title, content });
    await newNote.save();
    res.json(newNote);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a note
app.delete('/api/notes/:id', async (req, res) => {
  const { id } = req.params;
  const { uid } = req.query;

  try {
    const result = await Note.findOneAndDelete({ _id: id, uid });
    if (!result) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete selected notes
app.post('/api/notes/delete-selected', async (req, res) => {
  const { uid, selectedIds } = req.body;

  try {
    // Use deleteMany to delete multiple notes by their _id
    const result = await Note.deleteMany({ _id: { $in: selectedIds }, uid });
    
    if (result.deletedCount > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'No notes found with the provided IDs' });
    }
  } catch (error) {
    console.error('Error deleting selected notes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
