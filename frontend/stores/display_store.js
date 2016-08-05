const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher');
const DisplayStore = new Store(Dispatcher);
const DisplayConstants = require('../constants/display_constants');

var _notebookDrawerVisible = false;
var _notebookFormVisibile = false;

DisplayStore.openDrawer = function() {
  _notebookDrawerVisible = true;
  DisplayStore.__emitChange();
};

DisplayStore.closeDrawer = function() {
  _notebookDrawerVisible = false;
  DisplayStore.__emitChange();
};

DisplayStore.toggleDrawer = function() {
  _notebookDrawerVisible = (_notebookDrawerVisible) ? (false) : (true);
  DisplayStore.__emitChange();
};

DisplayStore.isNotebookDrawerOpen = function() {
  return _notebookDrawerVisible;
};

DisplayStore.showNotebookForm = function() {
  _notebookFormVisibile = true;
  DisplayStore.__emitChange();
};

DisplayStore.hideNotebookForm = function() {
  _notebookFormVisibile = false;
  DisplayStore.__emitChange();
};

DisplayStore.isNotebookFormVisible = function() {
  return _notebookFormVisibile;
};

DisplayStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case DisplayConstants.OPEN_DRAWER:
      DisplayStore.openDrawer();
      break;
    case DisplayConstants.CLOSE_DRAWER:
      DisplayStore.closeDrawer();
      break;
    case DisplayConstants.TOGGLE_DRAWER:
      DisplayStore.toggleDrawer();
      break;
    case DisplayConstants.SHOW_NOTEBOOK_FORM:
      DisplayStore.showNotebookForm();
      break;
    case DisplayConstants.HIDE_NOTEBOOK_FORM:
      DisplayStore.hideNotebookForm();
      break;
    }
};

module.exports = DisplayStore;
