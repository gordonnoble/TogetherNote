const Dispatcher = require('../dispatcher/dispatcher');
const SessionApiUtil = require('../utils/session_api_util');
const SessionConstants = require('../constants/session_constants');
const ErrorActions = require('./error_actions');
const SessionStore = require('../stores/session_store');
const hashHistory = require('react-router').hashHistory;

const SessionActions = {};

SessionActions.signup = function(user) {
  SessionApiUtil.signup(
    user,
    SessionActions.receiveCurrentUser,
    ErrorActions.setErrors
  );
};

SessionActions.login = function(user) {
  SessionApiUtil.login(user,
    SessionActions.receiveCurrentUser,
    ErrorActions.setErrors);
};

SessionActions.logInGuest = function() {
  SessionApiUtil.logInGuest(SessionActions.receiveCurrentUser);
};

SessionActions.logout = function() {
  let user = SessionStore.currentUser();
  SessionApiUtil.logout(user, SessionActions.removeCurrentUser);
};

SessionActions.receiveCurrentUser = function (user) {
  Dispatcher.dispatch({
    actionType: SessionConstants.LOGIN,
    user: user
  });
};

SessionActions.removeCurrentUser = function(user) {
  Dispatcher.dispatch({
    actionType: SessionConstants.LOGOUT,
    user: user
  });
  hashHistory.push('/login');
};

SessionActions.updateAvatar = function(formData) {
  let userId = SessionStore.currentUser().id;
  SessionApiUtil.updateAvatar(userId, formData, SessionActions.receiveNewAvatar);
};

SessionActions.receiveNewAvatar = function(image) {
  Dispatcher.dispatch({
    actionType: SessionConstants.RECEIVE_NEW_AVATAR,
    image: image
  });
};

SessionActions.searchUsers = function(username) {
  SessionApiUtil.searchUsers(username, SessionActions.receiveSearchResults);
};

SessionActions.receiveSearchResults = function(usernames) {
  Dispatcher.dispatch({
    actionType: SessionConstants.RECEIVE_USERNAMES,
    usernames: usernames
  });
};

module.exports = SessionActions;
