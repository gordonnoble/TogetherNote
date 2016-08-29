const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher');
const SessionStore = new Store(Dispatcher);
const SessionConstants = require('../constants/session_constants');
const NotebookConstants = require('../constants/notebook_constants');

var _currentUser = {};
var _matchingUsernames = [];

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

SessionStore.updateAvatar = function(image) {
  _currentUser.image_url = image.image_url;
  SessionStore.__emitChange();
};

SessionStore.setMatchingUsernames = function(usernames) {
  _matchingUsernames = usernames;
  SessionStore.__emitChange();
};

SessionStore.allMatchingUsernames = function() {
  return _matchingUsernames.slice();
};

SessionStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case SessionConstants.LOGIN:
      _login(payload.user);
      break;
    case SessionConstants.LOGOUT:
      _logout();
      break;
    case SessionConstants.RECEIVE_NEW_AVATAR:
      SessionStore.updateAvatar(payload.image);
      break;
    case SessionConstants.RECEIVE_USERNAMES:
      SessionStore.setMatchingUsernames(payload.usernames);
      break;
  }
};

module.exports = SessionStore;
