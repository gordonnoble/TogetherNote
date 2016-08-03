const React = require('react');
const SessionStore = require('../../stores/session_store');
const hashHistory = require('react-router').hashHistory;
const SessionActions = require('../../actions/session_actions');

const Notebook = React.createClass({
  logout (event) {
    event.preventDefault();
    SessionActions.logout();
  },
  render () {
    return (
      <header>
        <div id="welcome">Hi, {SessionStore.currentUser().username}</div>
        <div onClick={this.logout}><button>Logout</button></div>
      </header>
    );
  }
});

module.exports = Notebook;
