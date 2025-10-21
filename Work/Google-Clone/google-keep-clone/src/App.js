import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false); // Renamed from isSpaceMode

  useEffect(() => {
    const savedNotes = localStorage.getItem('keepNotes');
    const savedArchivedNotes = localStorage.getItem('keepArchivedNotes');
    if (savedNotes) setNotes(JSON.parse(savedNotes));
    if (savedArchivedNotes) setArchivedNotes(JSON.parse(savedArchivedNotes));
  }, []);

  useEffect(() => {
    localStorage.setItem('keepNotes', JSON.stringify(notes));
  }, [notes]);
  
  useEffect(() => {
    localStorage.setItem('keepArchivedNotes', JSON.stringify(archivedNotes));
  }, [archivedNotes]);

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
  
  const toggleDarkMode = () => setIsDarkMode(prevMode => !prevMode); // Renamed function

  const addNote = (noteData) => {
    const newNote = {
      id: Date.now(),
      title: noteData.title,
      content: noteData.content,
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

  return (
    // Using the new 'dark-mode' class
    <div className={isDarkMode ? "app dark-mode" : "app"}>
      <Header 
        toggleDarkMode={toggleDarkMode} // Pass renamed function
        isDarkMode={isDarkMode}         // Pass renamed state
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
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
          />
        )}
      </main>
    </div>
  );
}

export default App;