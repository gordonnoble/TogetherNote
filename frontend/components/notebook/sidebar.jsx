const React = require('react');
const SessionActions = require('../../actions/session_actions');

const Sidebar = React.createClass({
  logout (event) {
    event.preventDefault();
    SessionActions.logout();
  },
  render() {
    return (
      <div id="sidebar">
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
});

module.exports = Sidebar;
