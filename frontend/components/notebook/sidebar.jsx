const React = require('react');
const SessionActions = require('../../actions/session_actions');
const DisplayActions = require('../../actions/display_actions');

const Sidebar = React.createClass({
  logout (event) {
    event.preventDefault();
    SessionActions.logout();
  },
  openNotebookDrawer(event) {
    DisplayActions.openNotebookDrawer();
  },
  openTagDrawer(event) {
    DisplayActions.openTagDrawer();
  },
  render() {
    return (
      <div id="sidebar">
        <img className="logo" src={window.logo} />
        <button onClick={this.openNotebookDrawer} id="notebook-drawer-button"><img className="notebooks" src={window.notebooks} /></button>
        <button onClick={this.logout} className="logout">logout</button>
        <button onClick={this.openTagDrawer} id="tag-drawer-button"><img className="tags-button" src={window.tags} /></button>
      </div>
    );
  }
});

module.exports = Sidebar;
