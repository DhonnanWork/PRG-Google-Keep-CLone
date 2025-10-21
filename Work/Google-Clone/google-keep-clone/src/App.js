import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    const savedNotes = localStorage.getItem('keepNotes');
    const savedArchivedNotes = localStorage.getItem('keepArchivedNotes');
    const savedImage = localStorage.getItem('keepBackgroundImage');

    if (savedNotes) setNotes(JSON.parse(savedNotes));
    if (savedArchivedNotes) setArchivedNotes(JSON.parse(savedArchivedNotes));
    if (savedImage) setBackgroundImage(savedImage);
  }, []);

  useEffect(() => {
    localStorage.setItem('keepNotes', JSON.stringify(notes));
  }, [notes]);
  
  useEffect(() => {
    localStorage.setItem('keepArchivedNotes', JSON.stringify(archivedNotes));
  }, [archivedNotes]);

  useEffect(() => {
    if (backgroundImage) {
      localStorage.setItem('keepBackgroundImage', backgroundImage);
    } else {
      localStorage.removeItem('keepBackgroundImage');
    }
  }, [backgroundImage]);

  // --- THIS FUNCTION IS THE FIX FOR PROBLEM #1 ---
  const addNote = (noteData) => {
    const newNote = {
      id: Date.now(),
      title: noteData.title,
      content: noteData.content,
      isPinned: false,
      // Check the theme to set the correct default colors
      backgroundColor: isDarkMode ? '#1E1E1E' : '#ffffff',
      fontColor: isDarkMode ? '#FFFFFF' : '#202124',
      createdAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
  };

  const updateNote = (id, updatedNote) => {
    setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const archiveNote = (id) => {
    const noteToArchive = notes.find(note => note.id === id);
    setNotes(notes.filter(note => note.id !== id));
    setArchivedNotes([noteToArchive, ...archivedNotes]);
  };

  const unarchiveNote = (id) => {
    const noteToUnarchive = archivedNotes.find(note => note.id === id);
    setArchivedNotes(archivedNotes.filter(note => note.id !== id));
    setNotes([noteToUnarchive, ...notes]);
  };
  
  const deleteArchivedNote = (id) => {
    setArchivedNotes(archivedNotes.filter((note) => note.id !== id));
  };

  const togglePinNote = (id) => {
    setNotes(notes.map(note => 
        note.id === id ? { ...note, isPinned: !note.isPinned } : note
    ));
  };

  const updateNoteStyle = (id, styles) => {
    setNotes(notes.map(note =>
        note.id === id ? { ...note, ...styles } : note
    ));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 5000000) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('File is too large or not selected. Please choose an image under 5MB.');
    }
  };

  const removeBackgroundImage = () => {
    setBackgroundImage(null);
  };

  const toggleDarkMode = () => setIsDarkMode(prevMode => !prevMode);

  return (
    <div 
      className={isDarkMode ? "app dark-mode" : "app"}
      style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none' }}
    >
      <div className="app-overlay">
        <Header 
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          onImageUpload={handleImageUpload}
          onRemoveImage={removeBackgroundImage}
          hasImage={!!backgroundImage}
        />
        <main className="app-main">
          {currentPage === 'home' && (
            <>
              <NoteForm addNote={addNote} />
              <NotesList
                notes={notes}
                updateNote={updateNote}
                deleteNote={deleteNote}
                archiveNote={archiveNote}
                togglePinNote={togglePinNote}
                updateNoteStyle={updateNoteStyle}
              />
            </>
          )}
          
          {currentPage === 'archived' && (
            <NotesList
              notes={archivedNotes}
              updateNote={() => {}}
              deleteNote={deleteArchivedNote}
              unarchiveNote={unarchiveNote}
              isArchivedPage={true}
              togglePinNote={() => {}} 
              updateNoteStyle={() => {}}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;