const React = require('react');
const SessionStore = require('../../stores/session_store');
const NotebookActions = require('../../actions/notebook_actions');
const NoteIndex = require('./note_index');
const Sidebar = require('./sidebar');
const Note = require('./note');
const NotebookDrawer = require('./notebook_drawer');
const TagDrawer = require('./tag_drawer');
const ShareNotification = require('./share_notification');
const AccountEdit = require('./account_edit');

const Notebook = React.createClass({
  componentDidMount(){
    let id = this.props.params.id || SessionStore.currentUser().open_notebook_id;
    NotebookActions.fetchNotebook(id);
  },
  render () {
    return (
      <div id="notebook">
        <Sidebar />
        <AccountEdit />
        <ShareNotification />
        <NotebookDrawer />
        <TagDrawer />
        <NoteIndex />
        <Note />
      </div>
    );
  }
});

module.exports = Notebook;
