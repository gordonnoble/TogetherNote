const Dispatcher = require('../dispatcher/dispatcher');
const DisplayConstants = require('../constants/display_constants');

const DisplayActions = {};

DisplayActions.openDrawer = function() {
  Dispatcher.dispatch({
    actionType: DisplayConstants.OPEN_DRAWER
  });
};

DisplayActions.closeDrawer = function() {
  Dispatcher.dispatch({
    actionType: DisplayConstants.CLOSE_DRAWER
  });
};

DisplayActions.toggleDrawer = function() {
  Dispatcher.dispatch({
    actionType: DisplayConstants.TOGGLE_DRAWER
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

module.exports = DisplayActions;
