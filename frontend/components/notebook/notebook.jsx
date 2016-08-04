const React = require('react');
const SessionStore = require('../../stores/session_store');
const hashHistory = require('react-router').hashHistory;
const NotebookStore = require('../../stores/notebook_store');
const NotebookActions = require('../../actions/notebook_actions');
const NoteIndex = require('./note_index');
const NoteActions = require('../../actions/note_actions');
const Sidebar = require('./sidebar');
const Note = require('./note');

const Notebook = React.createClass({
  getInitialState() {
    this.id = this.props.params.id || essionStore.currentUser().id;
    return ({ notebook: {} });
  },
  componentDidMount(){
    this.notebookListener = NotebookStore.addListener(this.updateNotebook);
    NotebookActions.getNotebook(this.id);
  },
  componentWillUnmount() {
    this.notebookListener.remove();
  },
  updateNotebook() {
    let notebook = NotebookStore.currentNotebook();
    this.setState({ notebook: notebook });
  },
  render () {
    let noteId;

    if ( this.state.notebook.notes === undefined ) {
      noteId = undefined;
    } else {
      noteId = this.state.notebook.notes[0].id;
    }

    return (
      <div id="notebook">
        <Sidebar />

        <NoteIndex notes={this.state.notebook.notes} notebookName={this.state.notebook.name}/>

        <Note id={noteId}/>
      </div>
    );
  }
});

module.exports = Notebook;
