const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher');
const ErrorStore = new Store(Dispatcher);
const ErrorConstants = require('../constants/error_constants');

var _errors = [];
var _form = "";

var _setErrors = function(form, errors) {
  _form = form;
  _errors = errors;
  ErrorStore.__emitChange();
};

var _clearErrors = function() {
  _form = "";
  _errors = [];
  ErrorStore.__emitChange();
};

ErrorStore.errors = function(form) {
  if (form === _form) {
    return _errors.slice();
  }
};

ErrorStore.__onDispatch = function(payload) {
  switch(payload.actionType){
    case ErrorConstants.SET_ERRORS:
      _setErrors(payload.form, payload.errors);
      break;
    case ErrorConstants.CLEAR_ERRORS:
      _clearErrors();
      break;
  }
};

module.exports = ErrorStore;
