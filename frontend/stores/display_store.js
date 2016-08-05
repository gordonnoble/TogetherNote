const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher');
const DisplayStore = new Store(Dispatcher);
const NotebookConstants = require('../constants/notebook_constants');

var _formOpen = false;

DisplayStore.toggleForm = function() {
  _formOpen = (_formOpen) ? (false) : (true);
  DisplayStore.__emitChange();
};

DisplayStore.isFormOpen = function() {
  return _formOpen;
};

DisplayStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case NotebookConstants.TOGGLE_FORM:
      DisplayStore.toggleForm();
      break;
  }
};

module.exports = DisplayStore;
