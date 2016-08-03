const React = require('react');

const NoteIndexItem = React.createClass({
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
      <li id="note-index-item">
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
