const Dispatcher = require('../dispatcher/dispatcher');
const DisplayConstants = require('../constants/display_constants');

const DisplayActions = {};

DisplayActions.openNotebookDrawer = function() {
  Dispatcher.dispatch({
    actionType: DisplayConstants.OPEN_NOTEBOOK_DRAWER
  });
};

DisplayActions.closeNotebookDrawer = function() {
  Dispatcher.dispatch({
    actionType: DisplayConstants.CLOSE_NOTEBOOK_DRAWER
  });
};

DisplayActions.openTagDrawer = function() {
  Dispatcher.dispatch({
    actionType: DisplayConstants.OPEN_TAG_DRAWER
  });
};

DisplayActions.closeTagDrawer = function() {
  Dispatcher.dispatch({
    actionType: DisplayConstants.CLOSE_TAG_DRAWER
  });
};

DisplayActions.showNotebookForm = function() {
  Dispatcher.dispatch({
    actionType: DisplayConstants.SHOW_NOTEBOOK_FORM
  });
};

DisplayActions.hideNotebookForm = function() {
  Dispatcher.dispatch({
    actionType: DisplayConstants.HIDE_NOTEBOOK_FORM
  });
};

DisplayActions.closeNotesTags = function() {
  Dispatcher.dispatch({
    actionType: DisplayConstants.CLOSE_NOTES_TAGS
  });
};

DisplayActions.toggleNotesTags = function() {
  Dispatcher.dispatch({
    actionType: DisplayConstants.TOGGLE_NOTES_TAGS
  });
};

module.exports = DisplayActions;
