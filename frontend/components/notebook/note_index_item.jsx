const React = require('react');
const hashHistory = require('react-router').hashHistory;
const NoteActions = require('../../actions/note_actions');

const NoteIndexItem = React.createClass({
  openNote () {
    NoteActions.fetchNote(this.props.note.id);
  },
  render () {
    let style = "visible:false;includeInLayout:false";

    return (
      <li className="note-index-item" onClick={this.openNote}>
        <div className="note-index-item-header clearfix">
          {this.props.note.title}
        </div>
        <div className="note-index-item-body">
          {this.props.note.body}
        </div>
      </li>
    );
  }
});

module.exports = NoteIndexItem;
