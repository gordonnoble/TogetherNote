const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher');
const NotebookStore = new Store(Dispatcher);
const NotebookConstants = require('../constants/notebook_constants');
const NoteConstants = require('../constants/note_constants');

var _notebook = {};

NotebookStore.updateNotebook = function(notebook) {
  _notebook = notebook;
  NotebookStore.__emitChange();
};

NotebookStore.currentNotebook = function() {
  return Object.assign({}, _notebook);
};

NotebookStore.appendNote = function(note) {
  _notebook.notes.push({ title: note.title, body: note.body, id: note.id });
  NotebookStore.__emitChange();
};

NotebookStore.deleteNote = function(note) {
  _notebook.notes = _notebook.notes.filter( _note => _note.id !== note.id);
  NotebookStore.__emitChange();
};

NotebookStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case NotebookConstants.RECEIVE_NOTEBOOK:
      NotebookStore.updateNotebook(payload.notebook);
      break;
    case NoteConstants.NEW_NOTE:
      NotebookStore.appendNote(payload.note);
      break;
    case NoteConstants.DELETE_NOTE:
      NotebookStore.deleteNote(payload.note);
      break;
  }
};

module.exports = NotebookStore;
