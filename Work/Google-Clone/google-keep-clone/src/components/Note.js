import React, { useState } from 'react';
import './Note.css';

function Note({ note, updateNote, deleteNote, archiveNote, unarchiveNote, isArchivedPage, togglePinNote, updateNoteStyle }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);

  const colors = [
    { bg: '#ffffff', font: '#202124' }, // Default Light
    { bg: '#1E1E1E', font: '#FFFFFF' }, // Default Dark
    { bg: '#5f6368', font: '#ffffff' }, // Gray
    { bg: '#f28b82', font: '#000000' }, // Red
    { bg: '#fbbc04', font: '#000000' }, // Orange
    { bg: '#fff475', font: '#000000' }, // Yellow
    { bg: '#ccff90', font: '#000000' }, // Green
    { bg: '#a7ffeb', font: '#000000' }, // Teal
  ];

  const handleColorChange = (color) => {
    updateNoteStyle(note.id, { backgroundColor: color.bg, fontColor: color.font });
    setIsColorPaletteOpen(false);
  };

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
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(note.id);
    }
  };

  return (
    <div 
      className={`note ${note.isPinned ? 'pinned' : ''}`}
      style={{ backgroundColor: note.backgroundColor, color: note.fontColor }}
    >
      {isEditing ? (
        <div className="note-edit">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Title"
            className="note-edit-input"
            autoFocus
            style={{ color: note.fontColor }}
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="Take a note..."
            className="note-edit-textarea"
            rows={4}
            style={{ color: note.fontColor }}
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
        <div className="note-view" onClick={isArchivedPage ? null : () => setIsEditing(true)}>
          {/* --- THIS IS THE FIX --- Apply the style to the view mode text too */}
          {note.title && <h3 className="note-title" style={{ color: note.fontColor }}>{note.title}</h3>}
          <p className="note-content" style={{ color: note.fontColor }}>{note.content}</p>
          <div className="note-actions">
            {!isArchivedPage && (
              <button onClick={(e) => { e.stopPropagation(); togglePinNote(note.id); }} className="note-action-btn pin-btn" title="Pin note">
                {note.isPinned ? (
                  <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17 4a2 2 0 0 0-2-2H9c-1.1 0-2 .9-2 2v7l-2 3v2h6v5l1 1 1-1v-5h6v-2l-2-3V4z"></path></svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17 12l-2-3V4a2 2 0 0 0-2-2H9c-1.11 0-2 .89-2 2v5l-2 3h6v7l1 1 1-1v-7h6M14 4h-4v6.5l-1 1.5h6l-1-1.5V4z"></path></svg>
                )}
              </button>
            )}

            {isArchivedPage ? (
              <button onClick={(e) => { e.stopPropagation(); unarchiveNote(note.id); }} className="note-action-btn" title="Unarchive">
                <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.41l.83-1zM5 19V8h14v11H5zm8.45-6.62l-2.54 2.54c-.19.2-.45.31-.71.31s-.52-.11-.71-.31l-1.42-1.41c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l.71.71 1.84-1.84c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41z"></path></svg>
              </button>
            ) : (
              <button onClick={(e) => { e.stopPropagation(); archiveNote(note.id); }} className="note-action-btn" title="Archive">
                <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.41 5h13.18l.83 1H4.58l.83-1z"></path></svg>
              </button>
            )}

            {!isArchivedPage && (
                <div className="color-palette-container">
                    <button onClick={(e) => { e.stopPropagation(); setIsColorPaletteOpen(!isColorPaletteOpen); }} className="note-action-btn" title="Change color">
                        <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3a9 9 0 0 0 0 18a9 9 0 0 0 0-18zm-4.3 14.2a7 7 0 0 1 8.6 0a7 7 0 0 1-8.6 0zM12 5a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5a5 5 0 0 0-5 5H5a7 7 0 0 1 7-7z"></path></svg>
                    </button>
                    {isColorPaletteOpen && (
                        <div className="color-palette">
                            {colors.map(color => (
                                <div 
                                    key={color.bg}
                                    className="color-swatch"
                                    style={{ backgroundColor: color.bg }}
                                    onClick={(e) => { e.stopPropagation(); handleColorChange(color); }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
            
            <button
              onClick={(e) => { e.stopPropagation(); handleDelete(); }}
              className="note-action-btn"
              title="Delete note"
            >
              <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Note;