import React from 'react';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem';

// PUBLIC_INTERFACE
export default function NotesList({ notes, selectedId, onSelect, onDelete }) {
  /** Sidebar list of notes, sortable and clickable */
  return (
    <aside className="notes-list" aria-label="Notes list">
      {notes.length === 0 ? (
        <div className="empty-state" role="status" aria-live="polite">
          No notes found. Create a new note to get started.
        </div>
      ) : (
        <ul role="list" className="notes-ul">
          {notes.map((n) => (
            <NoteItem
              key={n.id}
              note={n}
              active={n.id === selectedId}
              onClick={() => onSelect(n.id)}
              onDelete={() => onDelete(n.id)}
            />
          ))}
        </ul>
      )}
    </aside>
  );
}

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    updatedAt: PropTypes.number.isRequired,
  })).isRequired,
  selectedId: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
