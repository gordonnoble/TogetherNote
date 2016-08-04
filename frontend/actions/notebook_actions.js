const NotebookApiUtil = require('../utils/notebook_api_util');
const Dispatcher = require('../dispatcher/dispatcher');
const NotebookConstants = require('../constants/notebook_constants');
const NotebookStore = require('../stores/notebook_store');

const NotebookActions = {};

NotebookActions.fetchNotebook = function(id) {
  NotebookApiUtil.fetchNotebook(id, NotebookActions.receiveNotebook);
};

NotebookActions.receiveNotebook = function(notebook) {
  Dispatcher.dispatch({
    actionType: NotebookConstants.RECEIVE_NOTEBOOK,
    notebook: notebook
  });
};

NotebookActions.refreshCurrentNotebook = function () {
  let notebookId = NotebookStore.currentNotebook().id;
  NotebookActions.fetchNotebook(notebookId);
};

NotebookActions.toggleDrawer = function() {
  Dispatcher.dispatch({
    actionType: NotebookConstants.TOGGLE_DRAWER
  });
};

NotebookActions.fetchNotebooks = function() {
  NotebookApiUtil.fetchNotebooks(NotebookActions.receiveNotebooks);
};

NotebookActions.receiveNotebooks = function(notebooks) {
  Dispatcher.dispatch({
    actionType: NotebookConstants.RECEIVE_NOTEBOOKS,
    notebooks: notebooks
  });
};
module.exports = NotebookActions;
