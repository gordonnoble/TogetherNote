const NotebookApiUtil = require('../utils/notebook_api_util');
const Dispatcher = require('../dispatcher/dispatcher');
const NotebookConstants = require('../constants/notebook_constants');
const NotebookStore = require('../stores/notebook_store');

const NotebookActions = {};

NotebookActions.fetchNewNotebook = function(id) {
  NotebookApiUtil.fetchNotebook(id, NotebookActions.receiveNewNotebook);
};

NotebookActions.createNotebook = function(notebook) {
  NotebookApiUtil.createNotebook(notebook, NotebookActions.receiveNewNotebook);
};

NotebookActions.refreshCurrentNotebook = function () {
  let notebookId = NotebookStore.currentNotebook().id;
  NotebookApiUtil.fetchNotebook(notebookId, NotebookActions.receiveUpdatedNotebook);
};

NotebookActions.receiveNewNotebook = function(notebook) {
  Dispatcher.dispatch({
    actionType: NotebookConstants.RECEIVE_NEW_NOTEBOOK,
    notebook: notebook
  });
};

NotebookActions.receiveUpdatedNotebook = function(notebook) {
  Dispatcher.dispatch({
    actionType: NotebookConstants.RECEIVE_UPDATED_NOTEBOOK,
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


module.exports = NotebookActions;
