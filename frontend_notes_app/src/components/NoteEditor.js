import React from 'react';
import PropTypes from 'prop-types';

// PUBLIC_INTERFACE
export default function NoteEditor({ note, onChange }) {
  /** Editor area to modify title and content for the selected note */
  if (!note) {
    return (
      <section className="editor" aria-label="Note editor">
        <div className="empty-state" role="status" aria-live="polite">
          Select a note from the list or create a new one.
        </div>
      </section>
    );
  }

  return (
    <section className="editor" aria-label="Note editor">
      <div className="editor-fields">
        <label htmlFor="note-title" className="sr-only">Title</label>
        <input
          id="note-title"
          className="input input-title"
          placeholder="Title"
          value={note.title}
          onChange={(e) => onChange({ title: e.target.value })}
        />
        <label htmlFor="note-content" className="sr-only">Content</label>
        <textarea
          id="note-content"
          className="textarea"
          placeholder="Write your note here..."
          value={note.content}
          onChange={(e) => onChange({ content: e.target.value })}
        />
      </div>
    </section>
  );
}

NoteEditor.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.number,
    updatedAt: PropTypes.number,
  }),
  onChange: PropTypes.func.isRequired,
};
