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
  NotebookApiUtil.fetchNotebook(notebookId, NotebookActions.receiveNotebook);
};

NotebookActions.toggleDrawer = function() {
  Dispatcher.dispatch({
    actionType: NotebookConstants.TOGGLE_DRAWER
  });
};

NotebookActions.toggleForm = function() {
  Dispatcher.dispatch({
    actionType: NotebookConstants.TOGGLE_FORM
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

NotebookActions.createNotebook = function(notebook) {
  NotebookApiUtil.createNotebook(notebook, NotebookActions.receiveNotebook);
};

module.exports = NotebookActions;
