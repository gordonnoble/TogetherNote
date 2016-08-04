const React = require('react');
const SessionStore = require('../../stores/session_store');
const hashHistory = require('react-router').hashHistory;
const NotebookStore = require('../../stores/notebook_store');
const NotebookActions = require('../../actions/notebook_actions');
const NoteIndex = require('./note_index');
const NoteActions = require('../../actions/note_actions');
const NoteStore = require('../../stores/note_store');
const Sidebar = require('./sidebar');
const Note = require('./note');

const Notebook = React.createClass({
  getInitialState() {
    this.id = this.props.params.id;
    return ({ notebook: {}, openNote: {} });
  },
  componentDidMount(){
    this.notebookListener = NotebookStore.addListener(this.updateNotebook);
    this.noteListener = NoteStore.addListener(this.updateNote);
    NotebookActions.getNotebook(this.id);
  },
  componentWillUnmount() {
    this.notebookListener.remove();
    this.noteListener.remove();
  },
  updateNotebook() {
    let notebook = NotebookStore.currentNotebook();
    let openNote = notebook.notes[0];
    NoteStore.updateNote(openNote);
    this.setState({ notebook: notebook, openNote: openNote });
  },
  updateNote() {
    this.setState({ openNote: NoteStore.currentNote() });
  },
  render () {
    return (
      <div id="notebook">
        <Sidebar />

        <NoteIndex notes={this.state.notebook.notes} />

        <Note note={this.state.openNote} />
      </div>
    );
  }
});

module.exports = Notebook;
