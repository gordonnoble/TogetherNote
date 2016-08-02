const React = require('react');
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');
const Link = require('react-router').Link;

const App = React.createClass({
  logout (event) {
    event.preventDefault();
    SessionActions.logout();
  },
  header () {
    if (SessionStore.isLoggedIn()) {
      return (
        <ul id="logged-in-list">
          <li id="welcome">Hi, {SessionStore.currentUser().username}</li>
          <li onClick={this.logout}><button>Logout</button></li>
        </ul>
      );
    } else {
      return (
        <ul id="logged-out-list">
          <li><Link to="/login">Log In</Link></li>
          <li><Link to='/signup'>Sign Up</Link></li>
        </ul>
      );
    }
  },
  render() {
    return (
      <div id="app">
        <header>
          {this.header()}
        </header>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
