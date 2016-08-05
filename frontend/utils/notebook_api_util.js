const Dispatcher = require('../dispatcher/dispatcher');

const NotebookApiUtil = {
  fetchNotebook(id, callback){
    $.ajax({
      url: `api/notebooks/${id}`,
      method: 'GET',
      success (notebook) {
        callback(notebook);
      }
    });
  },
  fetchNotebooks(callback) {
    $.ajax({
      url: 'api/notebooks',
      method: 'GET',
      success(notebooks) {
        callback(notebooks);
      }
    });
  },
  createNotebook(notebook, callback) {
    $.ajax({
      url: 'api/notebooks',
      method: 'POST',
      data: { notebook: notebook },
      success(notebook) {
        callback(notebook);
      }
    });
  },
  deleteNotebook(id, callback) {
    $.ajax({
      url: `api/notebooks/${id}`,
      method: 'DELETE',
      success(notebook) {
        callback(notebook);
      }
    });
  }
};

module.exports = NotebookApiUtil;
