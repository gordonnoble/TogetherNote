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
  }
};

module.exports = NotebookApiUtil;
