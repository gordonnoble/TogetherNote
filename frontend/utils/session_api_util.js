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

  // fetchCurrentUser(successCB, completeCB) {
  //   $.ajax({
  //     url: 'api/session',
  //     method: 'GET',
  //     success (user) {
  //       successCB(user);
  //     },
  //     error (xhr) {
  //       console.log("Failed to fetch current user");
  //     },
  //     complete () {
  //       completeCB();
  //     }
  //   });
  // }
};

module.exports = SessionApiUtil;
