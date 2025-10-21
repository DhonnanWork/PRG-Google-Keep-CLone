import React, { useState } from 'react';
import './Note.css';

// We need to define all the functions we'll receive from App.js
function Note({ note, updateNote, deleteNote, archiveNote, unarchiveNote, isArchivedPage }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);

  const handleSave = () => {
    updateNote(note.id, {
      ...note,
      title: editTitle,
      content: editContent,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(note.title);
    setEditContent(note.content);
    setIsEditing(false);
  };

  const handleDelete = () => {
    // We can use the same delete function for both archived and regular notes
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(note.id);
    }
  };

  return (
    <div className="note">
      {isEditing ? (
        // --- THIS IS THE COMPLETE EDIT MODE ---
        <div className="note-edit">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Title"
            className="note-edit-input"
            autoFocus
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="Take a note..."
            className="note-edit-textarea"
            rows={4}
          />
          <div className="note-edit-actions">
            <button onClick={handleSave} className="note-button note-button-save">
              Save
            </button>
            <button onClick={handleCancel} className="note-button note-button-cancel">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        // --- THIS IS THE COMPLETE VIEW MODE ---
        <div className="note-view" onClick={isArchivedPage ? null : () => setIsEditing(true)}>
          {/* Display title and content */}
          {note.title && <h3 className="note-title">{note.title}</h3>}
          <p className="note-content">{note.content}</p>
          
          <div className="note-actions">
            {/* Conditional Archive/Unarchive Button */}
            {isArchivedPage ? (
              <button onClick={(e) => { e.stopPropagation(); unarchiveNote(note.id); }} className="note-action-btn" title="Unarchive">
                <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.41l.83-1zM5 19V8h14v11H5zm8.45-6.62l-2.54 2.54c-.19.2-.45.31-.71.31s-.52-.11-.71-.31l-1.42-1.41c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l.71.71 1.84-1.84c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41z"></path></svg>
              </button>
            ) : (
              <button onClick={(e) => { e.stopPropagation(); archiveNote(note.id); }} className="note-action-btn" title="Archive">
                <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.41 5h13.18l.83 1H4.58l.83-1z"></path></svg>
              </button>
            )}

            {/* Delete button with its SVG */}
            <button
              onClick={(e) => { e.stopPropagation(); handleDelete(); }}
              className="note-action-btn"
              title="Delete note"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Note;