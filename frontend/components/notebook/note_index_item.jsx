const React = require('react');
const hashHistory = require('react-router').hashHistory;
const NoteActions = require('../../actions/note_actions');

const NoteIndexItem = React.createClass({
  openNote () {
    NoteActions.fetchNote(this.props.note.id);
  },
  notePreview() {
    let note = this.props.note;
    if (note.body.length < 100) {
      return note.body;
    } else {
      return (note.body.slice(0, 96) + "...");
    }
  },
  render () {
    return (
      <li id="note-index-item" onClick={this.openNote}>
        <div className="note-index-item-title">
          {this.props.note.title}
        </div>
        <div className="note-index-item-body">
          {this.notePreview()}
        </div>
      </li>
    );
  }
});

module.exports = NoteIndexItem;
