const React = require('react');
const NoteIndexItem = require('./note_index_item');
const NotesStore = require('../../stores/notes_store');

const NoteIndex = React.createClass({
  getInitialState() {
    let notes = NotesStore.allNotes();
    return ({ notes: notes });
  },
  componentDidMount() {
    this.noteListener = NotesStore.addListener(this.updateNotes);
  },
  componentWillUnmount() {
    this.noteListener.remove();
  },
  updateNotes() {
    let notes = NotesStore.allNotes();
    this.setState({ notes: notes });
  },
  render () {
    let notes = this.state.notes || [];
    let header = this.props.header || "";
    header = header.toUpperCase();

    return (

      <div id="note-index">
        <header>{header}</header>
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
