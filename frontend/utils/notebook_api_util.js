const Dispatcher = require('../dispatcher/dispatcher');

const NotebookApiUtil = {
  getNotebook(id, callback){
    $.ajax({
      url: `api/notebooks/${id}`,
      method: 'GET',
      success (notebook) {
        callback(notebook);
      }
    });
  }
};

module.exports = NotebookApiUtil;
