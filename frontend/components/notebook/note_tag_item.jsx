const React = require('react');
const NoteActions = require('../../actions/note_actions');
const DisplayActions = require('../../actions/display_actions');
const TagActions = require('../../actions/tag_actions');

const NoteTagItem = React.createClass({
  searchByTag(event) {
    NoteActions.searchByTag(this.props.tag.id);
    DisplayActions.closeNotesTags();
  },
  unTagNote(event) {
    event.stopPropagation();
    TagActions.unTagNote(this.props.noteId, this.props.tag);
  },
  render() {
    return (
      <li className="note-tag-item" onClick={this.searchByTag}>
        <span>{this.props.tag.name}</span>
        <div className="x-out-tag-note-item" onClick={this.unTagNote}>
          <img src={window.xOut} />
        </div>
      </li>
    );
  }
});

module.exports = NoteTagItem;
