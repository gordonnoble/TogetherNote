const Dispatcher = require('../dispatcher/dispatcher');

const SessionApiUtil = {
  signup (user, successCB, errorCB) {
    $.ajax({
      url: 'api/users',
      method: 'POST',
      data: { user: user },
      success (user) {
        successCB(user);
      },
      error (xhr) {
        let errors = xhr.responseJSON;
        errorCB("signup", errors);
      }
    });
  },

  login (user, successCB, errorCB) {
    $.ajax({
      url: 'api/session',
      method: 'POST',
      data: { user: user },
      success (user) {
        successCB(user);
      },
      error (xhr) {
        let errors = xhr.responseJSON;
        errorCB("login", errors);
      }
    });
  },

  logInGuest(callback) {
    $.ajax({
      url: 'api/session/guest',
      method: 'POST',
      success (user) {
        callback(user);
      }
    });
  },

  logout (user, successCB) {
    $.ajax({

      url: 'api/session',
      method: 'DELETE',
      data: { user: user },
      success (user) {
        successCB(user);
      },
      error (xhr) {
        let errors = xhr.responseJSON;
        console.log("signup", errors);
      }
    });
  }

};

module.exports = SessionApiUtil;
