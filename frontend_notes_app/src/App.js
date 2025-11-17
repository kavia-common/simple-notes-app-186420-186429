import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import './index.css';
import Header from './components/Header';
import NotesList from './components/NotesList';
import NoteEditor from './components/NoteEditor';
import { loadNotes, saveNotesDebounced } from './utils/notesStorage';

/**
 * Root application component for the Notes app.
 * Manages notes state, selected note, and search term; renders header, list, and editor.
 */
function App() {
  const [notes, setNotes] = useState(() => loadNotes());
  const [selectedId, setSelectedId] = useState(() => (loadNotes()[0]?.id ?? null));
  const [search, setSearch] = useState('');

  // Persist notes with debounce on change
  useEffect(() => {
    saveNotesDebounced(notes);
  }, [notes]);

  // Create a new note with default title
  const handleNewNote = useCallback(() => {
    const now = Date.now();
    const newNote = {
      id: `${now}-${Math.random().toString(36).slice(2, 8)}`,
      title: 'Untitled',
      content: '',
      createdAt: now,
      updatedAt: now,
    };
    setNotes(prev => [newNote, ...prev]);
    setSelectedId(newNote.id);
  }, []);

  // Delete with confirm
  const handleDelete = useCallback((id) => {
    const note = notes.find(n => n.id === id);
    const title = note?.title || 'note';
    // eslint-disable-next-line no-restricted-globals
    const ok = window.confirm(`Delete "${title}"? This action cannot be undone.`);
    if (!ok) return;
    setNotes(prev => prev.filter(n => n.id !== id));
    setSelectedId(prevId => (prevId === id ? null : prevId));
  }, [notes]);

  // Select note
  const handleSelect = useCallback((id) => setSelectedId(id), []);

  // Update title/content with autosave (state update triggers debounced save)
  const handleUpdate = useCallback((id, patch) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n));
  }, []);

  // Keyboard shortcut: Cmd/Ctrl + N -> new note
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key.toLowerCase() === 'n')) {
        e.preventDefault();
        handleNewNote();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleNewNote]);

  // Filter + sort notes
  const visibleNotes = useMemo(() => {
    const term = search.trim().toLowerCase();
    const filtered = term
      ? notes.filter(n =>
          n.title.toLowerCase().includes(term) ||
          n.content.toLowerCase().includes(term)
        )
      : notes;
    return [...filtered].sort((a, b) => b.updatedAt - a.updatedAt);
  }, [notes, search]);

  const selectedNote = useMemo(
    () => notes.find(n => n.id === selectedId) || null,
    [notes, selectedId]
  );

  return (
    <div className="notes-app">
      <Header
        title="Notes"
        search={search}
        onSearchChange={setSearch}
        onNewNote={handleNewNote}
      />
      <main className="app-main" role="main">
        <NotesList
          notes={visibleNotes}
          selectedId={selectedId}
          onSelect={handleSelect}
          onDelete={handleDelete}
        />
        <NoteEditor
          note={selectedNote}
          onChange={(patch) => selectedNote && handleUpdate(selectedNote.id, patch)}
        />
      </main>
    </div>
  );
}

export default App;
