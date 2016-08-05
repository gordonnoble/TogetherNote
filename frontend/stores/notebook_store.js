const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher');
const NotebookStore = new Store(Dispatcher);
const NotebookConstants = require('../constants/notebook_constants');
const NoteConstants = require('../constants/note_constants');

var _notebook = {};
var _notebooks = [];

NotebookStore.setNotebook = function(notebook) {
  _notebook = notebook;
  window.currentUser.open_notebook_id = notebook.id;
  NotebookStore.__emitChange();
};

NotebookStore.addNotebook = function(notebook) {
  _notebook = notebook;
  window.currentUser.open_notebook_id = notebook.id;
  
  _notebooks.push({id: notebook.id, name: notebook.name,
    created_at: notebook.created_at, updated_at: notebook.updated_at,
    removable: notebook.removable});
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

NotebookStore.setNotebooks = function(notebooks) {
  _notebooks = notebooks;
  NotebookStore.__emitChange();
};

NotebookStore.allNotebooks = function() {
  return _notebooks.slice().map( notebook => Object.assign({}, notebook));
};

NotebookStore.deleteNotebook = function(notebook) {
  _notebooks = _notebooks.filter( _notebook => _notebook.id !== notebook.id);

  if (_notebook.id === notebook.id) {
    _notebook = _notebooks[0];
  }

  NotebookStore.__emitChange();
};

NotebookStore.hasNotebook = function(id) {
  _notebooks.forEach( _notebook => {
    if (_notebook.id === id) {
      return true;
    }
  });
  return false;
};

NotebookStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case NotebookConstants.RECEIVE_NEW_NOTEBOOK:
      NotebookStore.addNotebook(payload.notebook);
      break;
    case NotebookConstants.RECEIVE_EXISTING_NOTEBOOK:
      NotebookStore.setNotebook(payload.notebook);
      break;
    case NoteConstants.NEW_NOTE:
      NotebookStore.appendNote(payload.note);
      break;
    case NoteConstants.DELETE_NOTE:
      NotebookStore.deleteNote(payload.note);
      break;
    case NotebookConstants.RECEIVE_NOTEBOOKS:
      NotebookStore.setNotebooks(payload.notebooks);
      break;
    case NotebookConstants.REMOVE_NOTEBOOK:
      NotebookStore.deleteNotebook(payload.notebook);
      break;
  }
};

module.exports = NotebookStore;
