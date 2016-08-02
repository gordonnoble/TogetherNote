const Dispatcher = require('../dispatcher/dispatcher');
const ErrorConstants = require('../constants/error_constants');

const ErrorActions = {};

ErrorActions.setErrors = function(form, errors) {
  Dispatcher.dispatch({
    actionType: ErrorConstants.SET_ERRORS,
    form: form,
    errors: errors
  });
};

ErrorActions.clearErrors = function() {
  Dispatcher.dispatch({
    actionType: ErrorConstants.CLEAR_ERRORS
  });
};

module.exports = ErrorActions;
