import React from 'react';
import Note from './Note';
import './NotesList.css';

// Receive all the new props
function NotesList({ notes, updateNote, deleteNote, archiveNote, unarchiveNote, isArchivedPage }) {
  if (notes.length === 0) {
    return (
      <div className="notes-empty">
        {/* ... empty state svg and text ... */}
        {/* You could even customize this text based on isArchivedPage */}
        <p className="notes-empty-text">
          {isArchivedPage ? "Archived notes appear here" : "Notes you add appear here"}
        </p>
      </div>
    );
  }

  return (
    <div className="notes-container">
      <div className="notes-grid">
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            updateNote={updateNote}
            deleteNote={deleteNote}
            archiveNote={archiveNote} // Pass down
            unarchiveNote={unarchiveNote} // Pass down
            isArchivedPage={isArchivedPage} // Pass down
          />
        ))}
      </div>
    </div>
  );
}

export default NotesList;