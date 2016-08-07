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

const Notebook = React.createClass({
  getInitialState() {
    this.id = this.props.params.id || SessionStore.currentUser().open_notebook_id;
    return ({ notebook: {} });
  },
  componentDidMount(){
    this.notebookListener = NotebookStore.addListener(this.updateNotebook);
    NotebookActions.fetchNotebook(this.id);
  },
  componentWillUnmount() {
    this.notebookListener.remove();
  },
  updateNotebook() {
    let notebook = NotebookStore.currentNotebook();
    this.setState({ notebook: notebook });
  },
  render () {
    return (
      <div id="notebook">
        <Sidebar />

        <NotebookDrawer />

        <NoteIndex notes={this.state.notebook.notes} notebookName={this.state.notebook.name}/>

        <Note />
      </div>
    );
  }
});

module.exports = Notebook;
