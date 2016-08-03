const NotebookApiUtil = require('../utils/notebook_api_util');
const Dispatcher = require('../dispatcher/dispatcher');
const NotebookConstants = require('../constants/notebook_constants');

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

module.exports = NotebookActions;
