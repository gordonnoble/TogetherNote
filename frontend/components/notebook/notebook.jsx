const React = require('react');
const SessionStore = require('../../stores/session_store');
const hashHistory = require('react-router').hashHistory;
const NotebookStore = require('../../stores/notebook_store');
const NotebookActions = require('../../actions/notebook_actions');
const NoteIndex = require('./note_index');
const NoteActions = require('../../actions/note_actions');
const Sidebar = require('./sidebar');
const Note = require('./note');
const NotebookDrawer = require('./notebook_drawer');
const TagDrawer = require('./tag_drawer');

const Notebook = React.createClass({
  componentDidMount(){
    let user = SessionStore.currentUser();
    this.id = this.props.params.id || user.open_notebook_id;
    NotebookActions.fetchNotebook(this.id);

    this.pusher = new Pusher('89f280eab9d24268d9be');
    let channel = this.pusher.subscribe('share_channel_' + user.id);
    channel.bind('shared_note', this.notifyShare);
  },
  notifyShare(note) {
    NotebookActions.fetchNotebooks();
    let notification = document.getElementById("share-notification");
    notification.className = "show";
    setTimeout(() => notification.className = "hide", 5000);
  },
  render () {
    return (
      <div id="notebook">
        <Sidebar />

        <NotebookDrawer />

        <TagDrawer />

        <div id="share-notification">
          <p>
            You received a new note!
          </p>
        </div>

        <NoteIndex />

        <Note />
      </div>
    );
  }
});

module.exports = Notebook;
