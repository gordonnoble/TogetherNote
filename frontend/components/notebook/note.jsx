const React = require('react');
const ReactQuill = require('react-quill');
const NoteActions = require('../../actions/note_actions');
const NoteStore = require('../../stores/note_store');
const TagActions = require('../../actions/tag_actions');
const NotesTags = require('./notes_tags');
const DisplayActions = require('../../actions/display_actions');

const Note = React.createClass({
  timer: setTimeout(()=>{}, 0),

  getInitialState() {
    let note = NoteStore.currentNote();
    return ({ note: note, newTag: "" , newShare: "" });
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

    this.setState({ note: note, newTag: "", newShare: "" });
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
  handleTagInput(event) {
    this.setState({ newTag: event.target.value });
  },
  handleShareInput(event) {
    this.setState({ newShare: event.target.value });
  },
  submitNewTag(event) {
    event.preventDefault();
    TagActions.tagNote(this.state.note.id, this.state.newTag);
    let confirmation = document.getElementById("tag-confirmation");
    confirmation.className = "show";
    this.setState({ newTag: "" });
    setTimeout(() => confirmation.className = "hide", 2000);
  },
  shareNote(event) {
    event.preventDefault();
    NoteActions.shareNote(this.state.note.id, this.state.newShare);
    let confirmation = document.getElementById("share-confirmation");
    confirmation.className = "show";
    this.setState({ newShare: "" });
    setTimeout(() => confirmation.className = "hide", 2000);
  },
  toggleNotesTags(event) {
    event.preventDefault();
    DisplayActions.toggleNotesTags();
  },
  clearTagPlaceholder() {
    document.getElementById("tag-input").placeholder = "";
  },
  resetTagPlaceholder() {
    document.getElementById("tag-input").placeholder = "tag it";
  },
  clearSharePlaceholder() {
    document.getElementById("tag-input").placeholder = "";
  },
  resetSharePlaceholder() {
    document.getElementById("tag-input").placeholder = "share it";
  },
  render () {
    let buttonClass = (this.state.imageFile === null) ? "hide" : "show";

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

            <form id="share-form" onSubmit={this.shareNote}>
                <img id="share-label" src={window.share} />
                <input id="share-input" type="text" placeholder="share it" onFocus={this.clearSharePlaceholder}
                  onBlur={this.resetSharePlaceholder} onChange={this.handleShareInput} value={this.state.newShare}/>
                <span id="share-confirmation" className="hide">shared</span>
              </form>

              <form id="tag-form" onSubmit={this.submitNewTag}>
                <img id="tag-label" src={window.tag} />
                <input id="tag-input" type="text" placeholder="tag it" onFocus={this.clearTagPlaceholder}
                  onBlur={this.resetTagPlaceholder} onChange={this.handleTagInput} value={this.state.newTag}/>
                <span id="tag-confirmation" className="hide">tagged</span>
              </form>

              <button id="toggle-tags-button" onClick={this.toggleNotesTags}><img src={window.tags} /></button>

          </header>
          <div id="note-body" onBlur={this.save}>

              <ReactQuill theme="snow" id="body-text"
                onChange={this.handleBodyChange} value={this.state.note.body}
                autofocus/>

              <NotesTags tags={this.state.note.tags} />
          </div>
        </div>
      );
    }
  }
});

module.exports = Note;
