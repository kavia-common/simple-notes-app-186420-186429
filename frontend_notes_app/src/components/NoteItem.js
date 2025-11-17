import React from 'react';
import PropTypes from 'prop-types';
import { FiFileText, FiTrash } from 'react-icons/fi';

function formatRelative(ts) {
  const diff = Date.now() - ts;
  const sec = Math.round(diff / 1000);
  if (sec < 60) return `${sec}s ago`;
  const min = Math.round(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const d = Math.round(hr / 24);
  return `${d}d ago`;
}

// PUBLIC_INTERFACE
export default function NoteItem({ note, active, onClick, onDelete }) {
  /** A single note item in the list with title, excerpt and updated time */
  return (
    <li className={`note-item ${active ? 'active' : ''}`}>
      <button
        className="note-button"
        onClick={onClick}
        aria-current={active ? 'true' : 'false'}
        aria-label={`Select note: ${note.title || 'Untitled'}`}
      >
        <div className="note-title-row">
          <span className="note-title" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span aria-hidden="true" style={{ color: 'var(--muted)', display: 'inline-flex' }}>
              <FiFileText size={16} />
            </span>
            {note.title || 'Untitled'}
          </span>
          <time className="note-time" dateTime={new Date(note.updatedAt).toISOString()}>
            {formatRelative(note.updatedAt)}
          </time>
        </div>
        <div className="note-excerpt" title={note.content}>
          {note.content?.slice(0, 80) || 'No content yet'}
        </div>
      </button>
      <button
        className="icon-btn danger"
        aria-label={`Delete note ${note.title || 'Untitled'}`}
        onClick={(e) => { e.stopPropagation(); onDelete(); }}
        title="Delete note"
      >
        <span aria-hidden="true" style={{ display: 'inline-flex' }}>
          <FiTrash size={16} />
        </span>
      </button>
    </li>
  );
}

NoteItem.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.number,
    updatedAt: PropTypes.number,
  }).isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
