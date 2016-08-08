const React = require('react');
const ReactQuill = require('react-quill');
const NoteActions = require('../../actions/note_actions');
const NoteStore = require('../../stores/note_store');
const TagActions = require('../../actions/tag_actions');

const Note = React.createClass({
  timer: setTimeout(()=>{}, 0),

  getInitialState() {
    let note = NoteStore.currentNote();
    return ({ note: note, newTag: "" });
  },
  componentDidMount(){
    this.noteListener = NoteStore.addListener(this.switchNote);
  },
  componentWillUnmount() {
    this.noteListener.remove();
  },
  switchNote() {
    if (NoteStore.currentNote().body === this.state.note.body) { return; }

    this.save();
    let note = NoteStore.currentNote();
    this.setState({ note: note, newTag: "" });
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
  handleTagInput(event) {
    this.setState({ newTag: event.target.value });
  },
  submitNewTag(event) {
    event.preventDefault();
    TagActions.tagNote(this.state.note.id, this.state.newTag);
    let confirmation = document.getElementById("tag-confirmation");
    confirmation.className = "show";
    setTimeout(() => confirmation.className = "hide", 2000);
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

              <form id="tag-form" onSubmit={this.submitNewTag}>
                <span id="tag-label">tag...</span>
                <input type="text" onChange={this.handleTagInput} value={this.state.newTag}/>
                <span id="tag-confirmation" className="hide">tag added</span>
              </form>

          </header>
          <ReactQuill theme="snow" id="note-body" onChange={this.handleBodyChange} value={this.state.note.body} autofocus/>
        </div>
      );
    }
  }
});

module.exports = Note;
