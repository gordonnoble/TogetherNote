const React = require('react');
const SessionStore = require('../../stores/session_store');
const NotebookActions = require('../../actions/notebook_actions');
const NotebookStore = require('../../stores/notebook_store');
const NoteActions = require('../../actions/note_actions');
const TagActions = require('../../actions/tag_actions');

const ShareNotification = React.createClass({
  getInitialState() {
    return({ id: undefined, title: "", username: "", class: "hide" });
  },
  componentDidMount() {
    this.pusher = new Pusher('89f280eab9d24268d9be');
    let channel = this.pusher.subscribe('share_channel_' + SessionStore.currentUser().id);
    channel.bind('shared_note', this.alert);
  },
  alert(share) {
    NotebookActions.fetchNotebooks();
    this.setState({ id: share.id, title: share.title, username: share.username, class: "show" });
    setTimeout(() => this.setState({ class: "hide" }), 5000);
  },
  goToNote() {
    let inboxId = NotebookStore.inboxId();
    NotebookActions.fetchNotebook(inboxId);
    NoteActions.fetchNote(this.state.id);
    TagActions.fetchAll();
    this.setState({ class: "hide" });
  },
  render() {
    return(
      <div id="share-notification" className={this.state.class} onClick={this.goToNote}>
        <p id="sharing-message">You received a new note from <span id="sharing-user">{this.state.username}</span>!</p>
      </div>
    );
  }
});

module.exports = ShareNotification;
