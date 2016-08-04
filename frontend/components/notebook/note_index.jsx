const React = require('react');
const NoteIndexItem = require('./note_index_item');

const NoteIndex = React.createClass({
  render () {
    let notes = this.props.notes || [];
    let notebookName = this.props.notebookName || "";
    notebookName = notebookName.toUpperCase();
    
    return (

      <div id="note-index">
        <header>{notebookName}</header>
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
