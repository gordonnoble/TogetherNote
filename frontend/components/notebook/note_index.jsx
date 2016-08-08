const React = require('react');
const NoteIndexItem = require('./note_index_item');

const NoteIndex = React.createClass({
  render () {
    let notes = this.props.notes || [];
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
