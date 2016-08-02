const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher');
const SessionStore = new Store(Dispatcher);
const SessionConstants = require('../constants/session_constants');

var _currentUser = {};

var _login = function(user) {
  _currentUser = user;
  SessionStore.__emitChange();
};

var _logout = function() {
  _currentUser = {};
  SessionStore.__emitChange();
};

SessionStore.currentUser = function() {
  return Object.assign({}, _currentUser);
};

SessionStore.isLoggedIn = function() {
  return !!_currentUser.id;
};

SessionStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case SessionConstants.LOGIN:
      _login(payload.user);
      break;
    case SessionConstants.LOGOUT:
      _logout();
      break;
  }
};

module.exports = SessionStore;
