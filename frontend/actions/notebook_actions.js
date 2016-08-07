const NotebookApiUtil = require('../utils/notebook_api_util');
const Dispatcher = require('../dispatcher/dispatcher');
const NotebookConstants = require('../constants/notebook_constants');
const NotebookStore = require('../stores/notebook_store');

const NotebookActions = {};

NotebookActions.fetchNotebook = function(id) {
  id = id || NotebookStore.currentNotebook().id;
  NotebookApiUtil.fetchNotebook(id, NotebookActions.receiveNotebook);
};

NotebookActions.createNotebook = function(notebook) {
  NotebookApiUtil.createNotebook(notebook, NotebookActions.receiveNewNotebook);
};

NotebookActions.receiveNewNotebook = function(notebook) {
  Dispatcher.dispatch({
    actionType: NotebookConstants.RECEIVE_NEW_NOTEBOOK,
    notebook: notebook
  });
};

NotebookActions.receiveNotebook = function(notebook) {
  Dispatcher.dispatch({
    actionType: NotebookConstants.RECEIVE_EXISTING_NOTEBOOK,
    notebook: notebook
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

NotebookActions.deleteNotebook = function(id) {
  NotebookApiUtil.deleteNotebook(id, NotebookActions.removeNotebook);
};

NotebookActions.removeNotebook = function(notebook) {
  Dispatcher.dispatch({
    actionType: NotebookConstants.REMOVE_NOTEBOOK,
    notebook: notebook
  });
};

NotebookActions.updateAll = function() {
  NotebookActions.fetchNotebook();
  NotebookActions.fetchNotebooks();
};

module.exports = NotebookActions;
