import React from 'react';
import PropTypes from 'prop-types';

// PUBLIC_INTERFACE
export default function Header({ title, search, onSearchChange, onNewNote }) {
  /** Header with title, search input, and New Note button */
  return (
    <header className="app-header" role="banner">
      <h1 className="app-title">{title}</h1>
      <div className="header-actions">
        <label htmlFor="search" className="sr-only">Search notes</label>
        <input
          id="search"
          aria-label="Search notes"
          type="search"
          className="input"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={onNewNote}
          aria-label="Create new note"
        >
          + New Note
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
