const React = require('react');
const NoteIndexItem = require('./note_index_item');
const NotesStore = require('../../stores/notes_store');
const NoteActions = require('../../actions/note_actions');

const NoteIndex = React.createClass({
  getInitialState() {
    let notes = NotesStore.allNotes();
    let header = NotesStore.header();
    return ({ notes: notes, header: header });
  },
  componentDidMount() {
    this.noteListener = NotesStore.addListener(this.updateNotes);
  },
  componentWillUnmount() {
    this.noteListener.remove();
  },
  updateNotes() {
    let notes = NotesStore.allNotes();
    let header = NotesStore.header();
    this.setState({ notes: notes, header: header });
  },
  newNote(event) {
    event.preventDefault();
    let notebookId = NotebookStore.currentNotebookId();
    NoteActions.newNote(notebookId);
  },
  render () {
    let notes = this.state.notes || [];
    let header = this.state.header || "";
    header = header.toUpperCase();
    let buttonClass =  (NotesStore.bookType() === "notebook") ? "new-note show" : "new-note hide";

    return (

      <div id="note-index">
        <header>
          <h2>{header}</h2>
          <button className={buttonClass} onClick={this.newNote}><img src={window.newNote} /></button>
        </header>

        <ul>
          {
            notes.map( note => <NoteIndexItem key={note.id} note={note} /> )
          }
        </ul>
    </div>
    );
  }
});

module.exports = NoteIndex;
