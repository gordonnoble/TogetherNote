const NotebookApiUtil = require('../utils/notebook_api_util');
const Dispatcher = require('../dispatcher/dispatcher');
const NotebookConstants = require('../constants/notebook_constants');
const NotebookStore = require('../stores/notebook_store');

const NotebookActions = {};

NotebookActions.getNotebook = function(id) {
  NotebookApiUtil.getNotebook(id, NotebookActions.receiveNotebook);
};

NotebookActions.receiveNotebook = function(notebook) {
  Dispatcher.dispatch({
    actionType: NotebookConstants.RECEIVE_NOTEBOOK,
    notebook: notebook
  });
};

NotebookActions.refreshCurrentNotebook = function () {
  let notebookId = NotebookStore.currentNotebook().id;
  NotebookActions.getNotebook(notebookId);
};


module.exports = NotebookActions;
