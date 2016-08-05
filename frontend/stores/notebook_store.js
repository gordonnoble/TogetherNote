const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher');
const NotebookStore = new Store(Dispatcher);
const NotebookConstants = require('../constants/notebook_constants');
const NoteConstants = require('../constants/note_constants');

var _notebook = {};
var _drawerOpen = false;
var _notebooks = [];

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

NotebookStore.toggleDrawer = function() {
  _drawerOpen= (_drawerOpen) ? (false) : (true);
  NotebookStore.__emitChange();
};

NotebookStore.isDrawerOpen = function () {
  return _drawerOpen;
};

NotebookStore.updateNotebooks = function(notebooks) {
  _notebooks = notebooks;
  NotebookStore.__emitChange();
};

NotebookStore.allNotebooks = function() {
  return _notebooks.slice().map( notebook => Object.assign({}, notebook));
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
    case NotebookConstants.TOGGLE_DRAWER:
      NotebookStore.toggleDrawer();
      break;
    case NotebookConstants.RECEIVE_NOTEBOOKS:
      NotebookStore.updateNotebooks(payload.notebooks);
      break;
  }
};

module.exports = NotebookStore;
