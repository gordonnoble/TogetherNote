const React = require('react');
const hashHistory = require('react-router').hashHistory;
const NoteActions = require('../../actions/note_actions');
const DisplayActions = require('../../actions/display_actions');

const NoteIndexItem = React.createClass({
  openNote (event) {
    NoteActions.fetchNote(this.props.note.id);
  },
  delete(event) {
    event.stopPropagation();
    NoteActions.deleteNote(this.props.note.id);
  },
  drag() {
    DisplayActions.openDrawer();
    NoteActions.startDrag(this.props.note.id);
  },
  render () {
    let text = this.props.note.body;

    return (
      <li className="note-index-item"
        onClick={this.openNote}
        draggable="true"
        onDragOver={this.drag}>

        <header className="clearfix">
          <h3>{this.props.note.title}</h3>
          <button onClick={this.delete}><img className="recycling" src={window.recycling} /></button>
        </header>
        <div className="note-index-item-body">
          {text}
        </div>
      </li>
    );
  }
});

module.exports = NoteIndexItem;
