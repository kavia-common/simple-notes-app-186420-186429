import React from 'react';
import PropTypes from 'prop-types';
import { FiTrash, FiClock } from 'react-icons/fi';

/**
 * Optionally, parent may pass onDeleteSelected to render a delete button.
 * This keeps backward compatibility: if absent, no button is shown.
 */
 
// PUBLIC_INTERFACE
export default function NoteEditor({ note, onChange, onDeleteSelected }) {
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span aria-hidden="true"><FiClock size={16} /></span>
            <span aria-live="polite">Updated {new Date(note.updatedAt).toLocaleString()}</span>
          </div>
          {typeof onDeleteSelected === 'function' && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => onDeleteSelected(note.id)}
              aria-label="Delete current note"
              title="Delete note"
            >
              <span aria-hidden="true" style={{ display: 'inline-flex', marginRight: 8 }}>
                <FiTrash size={16} />
              </span>
              Delete
            </button>
          )}
        </div>

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
  onDeleteSelected: PropTypes.func,
};
