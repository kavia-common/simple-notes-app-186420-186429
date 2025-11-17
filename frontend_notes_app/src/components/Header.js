import React from 'react';
import PropTypes from 'prop-types';
import { FiEdit3, FiPlus, FiSearch } from 'react-icons/fi';

// PUBLIC_INTERFACE
export default function Header({ title, search, onSearchChange, onNewNote }) {
  /** Header with title, search input, and New Note button */
  return (
    <header className="app-header" role="banner">
      <h1 className="app-title" aria-label={`${title} application`}>
        <span aria-hidden="true" style={{ display: 'inline-flex', verticalAlign: 'middle', marginRight: 8 }}>
          <FiEdit3 size={20} />
        </span>
        {title}
      </h1>
      <div className="header-actions">
        <label htmlFor="search" className="sr-only">Search notes</label>
        <div style={{ position: 'relative', flex: 1, maxWidth: 420 }}>
          <input
            id="search"
            aria-label="Search notes"
            type="search"
            className="input"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{ paddingLeft: 36 }}
          />
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--muted)',
              display: 'inline-flex'
            }}
          >
            <FiSearch size={18} />
          </span>
        </div>
        <button
          className="btn btn-primary"
          onClick={onNewNote}
          aria-label="Create new note"
        >
          <span aria-hidden="true" style={{ display: 'inline-flex', marginRight: 8 }}>
            <FiPlus size={18} />
          </span>
          New Note
        </button>
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onNewNote: PropTypes.func.isRequired,
};
