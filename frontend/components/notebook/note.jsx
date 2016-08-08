const React = require('react');
const ReactQuill = require('react-quill');
const NoteActions = require('../../actions/note_actions');
const NoteStore = require('../../stores/note_store');
// const TagActions = require('../../actions/tag_actions');

const Note = React.createClass({
  timer: setTimeout(()=>{}, 0),

  getInitialState() {
    let note = NoteStore.currentNote();
    return ({ note: note });
  },
  componentDidMount(){
    this.noteListener = NoteStore.addListener(this.switchNote);
  },
  componentWillUnmount() {
    this.noteListener.remove();
  },
  switchNote() {
    this.save();
    let note = NoteStore.currentNote();
    this.setState({ note: note });
  },
  handleTitleChange (event) {
    let newState = this.state;
    newState.note.title = event.target.value;
    this.setState(newState);
    clearTimeout(this.timer);
    this.timer = setTimeout(this.save, 1000);
  },
  save() {
    if (this.state.note.id !== undefined && !NoteStore.isEmpty()) {
      NoteActions.pushNote( this.state.note );
    }
  },
  handleBodyChange(bodyText) {
    let newState = this.state;
    newState.note.body = bodyText;
    this.setState(newState);
    clearTimeout(this.timer);
    this.timer = setTimeout(this.save, 1000);
  },
  newTag(event) {
    // TagActions.tagNote(this.state.note.id, event.target.value);
  },
  render () {
    if ( this.state.note.title === undefined ) {
      return (
        <div id="note-splash" className="note"><img className="logo" src={window.noteSplash} /></div>
      );
    } else {
      return (
        <div className="note">
          <header id="note-header">
            <input type="text" className="title" value={this.state.note.title} onChange={this.handleTitleChange} />

              <form id="tag-form" onSubmit={this.newTag}>
                <span id="tag-label">tag...</span>
                <input type="text" onChange={this.handleTagChange} />
              </form>

          </header>
          <ReactQuill theme="snow" id="note-body" onChange={this.handleBodyChange} value={this.state.note.body} autofocus/>
        </div>
      );
    }
  }
});

module.exports = Note;
