const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher');
const NotebookStore = new Store(Dispatcher);
const NotebookConstants = require('../constants/notebook_constants');
const NoteConstants = require('../constants/note_constants');

var _notebooks = {};

NotebookStore.setNotebook = function(notebook) {
  window.currentUser.open_notebook_id = notebook.id;
  NotebookStore.__emitChange();
};

NotebookStore.addNotebook = function(notebook) {
  window.currentUser.open_notebook_id = notebook.id;

  _notebooks[notebook.id] = {
    id: notebook.id, name: notebook.name,
    created_at: notebook.created_at, updated_at: notebook.updated_at,
    removable: notebook.removable,
    note_count: 0
  };

  NotebookStore.__emitChange();
};

NotebookStore.currentNotebookId = function() {
  return window.currentUser.open_notebook_id;
};

NotebookStore.setNotebooks = function(notebooks) {
  _notebooks = notebooks;
  NotebookStore.__emitChange();
};

NotebookStore.allNotebooks = function() {
  let notebooks = [];

  for (let key in _notebooks) {
    notebooks.push(_notebooks[key]);
  }

  return notebooks;
};

NotebookStore.deleteNotebook = function(notebook) {
  delete _notebooks[notebook.id];

  if (notebook.id === window.currentUser.open_notebook_id) {
    let firstKey;
    for(firstKey in _notebooks) break;
    NotebookActions.fetchNotebook(firstKey);
  }

  NotebookStore.__emitChange();
};

NotebookStore.incrementNoteCount = function() {
  _notebooks[window.currentUser.open_notebook_id].note_count++;
  NotebookStore.__emitChange();
};

NotebookStore.inboxId = function() {
  for(let key in _notebooks) {
    if (_notebooks[key].name === "Inbox") {
      return key;
    }
  }
};

NotebookStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case NotebookConstants.RECEIVE_NEW_NOTEBOOK:
      NotebookStore.addNotebook(payload.notebook);
      break;
    case NotebookConstants.RECEIVE_EXISTING_NOTEBOOK:
      NotebookStore.setNotebook(payload.notebook);
      break;
    case NotebookConstants.RECEIVE_NOTEBOOKS:
      NotebookStore.setNotebooks(payload.notebooks);
      break;
    case NotebookConstants.REMOVE_NOTEBOOK:
      NotebookStore.deleteNotebook(payload.notebook);
      break;
    case NoteConstants.NEW_NOTE:
      NotebookStore.incrementNoteCount(payload.note);
      break;
  }
};

module.exports = NotebookStore;
