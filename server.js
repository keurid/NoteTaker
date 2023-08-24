const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

let notes = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

function NoteIdGen() {
    return Date.now().toString();
}

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
  
    if (!newNote.title || !newNote.text) {
      return res.status(400).json({ error: 'Both title and text are required fields.' });
    }
  
    newNote.id = generateNoteId();
  
    notes.push(newNote);
  
    res.json(newNote);
  });


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });