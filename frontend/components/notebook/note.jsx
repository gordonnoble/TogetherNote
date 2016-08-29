const React = require('react');
const ReactQuill = require('react-quill');
const NoteActions = require('../../actions/note_actions');
const NoteStore = require('../../stores/note_store');
const NotesTags = require('./notes_tags');
const DisplayActions = require('../../actions/display_actions');
const TagForm = require('./tag_form');
const ShareForm = require('./share_form');

const Note = React.createClass({
  timer: setTimeout(()=>{}, 0),

  getInitialState() {
    let note = NoteStore.currentNote();
    return ({ note: note });
  },
  componentDidMount(){
    this.noteListener = NoteStore.addListener(this.switchNote);
    this.pusher = new Pusher('89f280eab9d24268d9be');
  },
  handleExternalUpdate(noteData) {
    let newState = this.state;
    newState.note.title = noteData.title;
    newState.note.body = noteData.body;
    this.setState(newState);
  },
  componentWillUnmount() {
    this.noteListener.remove();
  },
  switchNote() {
    this.silentSave();
    this.pusher.unsubscribe('note_' + this.state.note.id);

    let note = NoteStore.currentNote();
    let channel = this.pusher.subscribe('note_' + note.id);
    channel.bind('external_update', this.handleExternalUpdate);

    this.setState({ note: note });
  },
  handleTitleChange (event) {
    let newState = this.state;
    newState.note.title = event.target.value;
    this.setState(newState);
    clearTimeout(this.timer);
    this.timer = setTimeout(this.save, 1000);
  },
  silentSave() {
    if (this.state.note.id !== undefined && !NoteStore.isEmpty()) {
      NoteActions.silentPushNote( this.state.note );
    }
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
  toggleNotesTags(event) {
    event.stopPropagation();
    event.preventDefault();
    DisplayActions.toggleNotesTags();
  },
  render () {
    let buttonClass = (this.state.imageFile === null) ? "hide" : "show";
    let tagsArray = NoteStore.tags();

    if ( this.state.note.title === undefined ) {
      return (
        <div id="note-splash" className="note"><img className="logo" src={window.noteSplash} /></div>
      );
    } else {
      return (
        <div className="note">
          <header id="note-header">
            <input type="text" className="title"
              onChange={this.handleTitleChange} value={this.state.note.title} />

            <ShareForm noteId={ this.state.note.id } />

            <TagForm noteId={ this.state.note.id }/>

            <button id="toggle-tags-button" onClick={this.toggleNotesTags}><img src={window.tags} /></button>

          </header>
          <div id="note-body" onBlur={this.save}>

              <ReactQuill theme="snow" id="body-text"
                onChange={this.handleBodyChange} value={this.state.note.body}
                autofocus/>

              <NotesTags tags={tagsArray} noteId={this.state.note.id}/>
          </div>
        </div>
      );
    }
  }
});

module.exports = Note;
