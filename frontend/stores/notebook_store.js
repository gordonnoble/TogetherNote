const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher');
const NotebookStore = new Store(Dispatcher);
const NotebookConstants = require('../constants/notebook_constants');

var _notebook = {};

NotebookStore.updateNotebook = function(notebook) {
  _notebook = notebook;
  NotebookStore.__emitChange();
};

NotebookStore.currentNotebook = function() {
  return Object.assign({}, _notebook);
};

NotebookStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case NotebookConstants.RECEIVE_NOTEBOOK:
      NotebookStore.updateNotebook(payload.notebook);
      break;
  }
};

module.exports = NotebookStore;
