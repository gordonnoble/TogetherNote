const React = require('react');
const ReactQuill = require('react-quill');
const NoteActions = require('../../actions/note_actions');
const NoteStore = require('../../stores/note_store');

const Note = React.createClass({
  timer: setTimeout(()=>{}, 0),

  getInitialState() {
    let note = NoteStore.currentNote();
    return (note);
  },
  componentDidMount(){
    this.noteListener = NoteStore.addListener(this.switchNote);
  },
  componentWillUnmount() {
    this.noteListener.remove();
  },
  switchNote() {
    this.save();
    this.setState(NoteStore.currentNote());
  },
  handleTitleChange (event) {
    let newState = {};
    newState[event.target.className] = event.target.value;
    this.setState(newState);
    clearTimeout(this.timer);
    this.timer = setTimeout(this.save, 1000);
  },
  save() {
    if (this.state.id !== undefined && !NoteStore.isEmpty()) {
      NoteActions.pushNote(this.state);
    }
  },
  handleBodyChange(bodyText) {
    this.setState({ body: bodyText });
    clearTimeout(this.timer);
    this.timer = setTimeout(this.save, 1000);
  },
  newTag() {
    
  },
  render () {
    if ( this.state.title === undefined ) {
      return (
        <div id="note-splash" className="note"><img className="logo" src={window.noteSplash} /></div>
      );
    } else {
      return (
        <div className="note">
          <header id="note-header">
            <input type="text" className="title" value={this.state.title} onChange={this.handleTitleChange} />

            <div id="tag-input">
              <span className="label">tag:</span>
              <form onSubmit={this.newTag}>
                <input type="text" onChange={this.handleTagChange} />
              </form>
            </div>

          </header>
          <ReactQuill theme="snow" id="note-body" onChange={this.handleBodyChange} value={this.state.body} autofocus/>
        </div>
      );
    }
  }
});

module.exports = Note;
