const React = require('react');
const SessionActions = require('../../actions/session_actions');
const NoteActions = require('../../actions/note_actions');
const NotebookActions = require('../../actions/notebook_actions');

const Sidebar = React.createClass({
  logout (event) {
    event.preventDefault();
    SessionActions.logout();
  },
  newNote(event) {
    event.preventDefault();
    let notebookId = NotebookStore.currentNotebook().id;
    NoteActions.newNote(notebookId);
  },
  toggleDrawer() {
    NotebookActions.toggleDrawer();
  },
  render() {
    return (
      <div id="sidebar">
        <button onClick={this.logout}>Logout</button>
        <button onClick={this.newNote}>New Note</button>
        <button onClick={this.toggleDrawer}>Notebooks</button>
      </div>
    );
  }
});

module.exports = Sidebar;
