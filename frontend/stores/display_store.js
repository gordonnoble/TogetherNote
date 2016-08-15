const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher');
const DisplayStore = new Store(Dispatcher);
const DisplayConstants = require('../constants/display_constants');

var _notebookDrawerVisible = false;
var _notebookFormVisibile = false;
var _tagDrawerVisible = false;
var _notesTagsVisible = false;

DisplayStore.openNotebookDrawer = function() {
  _notebookDrawerVisible = true;
  DisplayStore.__emitChange();
};

DisplayStore.closeNotebookDrawer = function() {
  _notebookDrawerVisible = false;
  DisplayStore.__emitChange();
};

DisplayStore.isNotebookDrawerOpen = function() {
  return _notebookDrawerVisible;
};

DisplayStore.openTagDrawer = function() {
  _tagDrawerVisible = true;
  DisplayStore.__emitChange();
};

DisplayStore.closeTagDrawer = function() {
  _tagDrawerVisible = false;
  DisplayStore.__emitChange();
};

DisplayStore.isTagDrawerOpen = function() {
  return _tagDrawerVisible;
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

DisplayStore.closeNotesTags = function() {
  console.log('closing');
  _notesTagsVisible = false;
  DisplayStore.__emitChange();
};

DisplayStore.toggleNotesTags = function() {
  console.log('toggling');
  _notesTagsVisible = (_notesTagsVisible) ? false : true;
  DisplayStore.__emitChange();
};

DisplayStore.areNotesTagsVisible = function() {
  return _notesTagsVisible;
};

DisplayStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case DisplayConstants.OPEN_NOTEBOOK_DRAWER:
      DisplayStore.openNotebookDrawer();
      break;
    case DisplayConstants.CLOSE_NOTEBOOK_DRAWER:
      DisplayStore.closeNotebookDrawer();
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
    case DisplayConstants.OPEN_TAG_DRAWER:
      DisplayStore.openTagDrawer();
      break;
    case DisplayConstants.CLOSE_TAG_DRAWER:
      DisplayStore.closeTagDrawer();
      break;
    case DisplayConstants.TOGGLE_NOTES_TAGS:
      DisplayStore.toggleNotesTags();
      break;
    case DisplayConstants.CLOSE_NOTES_TAGS:
      DisplayStore.closeNotesTags();
      break;
    }
};

module.exports = DisplayStore;
