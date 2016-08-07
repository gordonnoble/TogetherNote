const React = require('react');
const DisplayActions = require('../../actions/display_actions');
const NotebookActions = require('../../actions/notebook_actions');
const NoteActions = require('../../actions/note_actions');

const NotebookIndexItem = React.createClass({

  openNotebook() {
    NotebookActions.fetchNotebook(this.props.notebook.id);
    DisplayActions.closeDrawer();
  },
  delete(event) {
    NotebookActions.deleteNotebook(this.props.notebook.id);
    NotebookActions.fetchNotebook();
  },
  prepForDrop(event){
    event.preventDefault();
    document.getElementById(this.uniqueId).className = "notebook-index-item clearfix dragged-on";
  },
  clearDropStyle() {
    document.getElementById(this.uniqueId).className = "notebook-index-item clearfix";
  },
  acceptDrop(event) {
    event.preventDefault();
    this.clearDropStyle();
    let noteId = NoteStore.dragNoteId();
    if ( noteId === undefined) { return; }
    NoteActions.switchNotesNotebook(noteId, this.props.notebook.id);
  },
  render() {
    this.uniqueId = "notebook-item " + this.props.notebook.id;

    let buttonClass = (this.props.notebook.removable) ? "deletable" : "permanent";
    let noteCount = this.props.notebook.note_count;
    let countDisplay = (noteCount === 1) ? (`${noteCount} note`) : (`${noteCount} notes`);

    return(
      <li className="notebook-index-item clearfix"
        id={this.uniqueId}
        onClick={this.openNotebook}
        onDragOver={this.prepForDrop}
        onDragLeave={this.clearDropStyle}
        onDrop={this.acceptDrop}>

        <h4>{this.props.notebook.name}</h4>
        <span className="note-count">{countDisplay}</span>
        <button className={buttonClass} onClick={this.delete}><img className="recycling" src={window.recycling} /></button>
      </li>
    );
  }
});

module.exports = NotebookIndexItem;
