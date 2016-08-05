const React = require('react');
const NoteActions = require('../../actions/note_actions');
const NoteStore = require('../../stores/note_store');

const Note = React.createClass({
  timer: setTimeout(()=>{}, 0),

  getInitialState() {
    let note = NoteStore.currentNote();
    return (note);
  },
  componentDidMount(){
    NoteStore.addListener(this.switchNote);
  },
  switchNote() {
    this.save();
    this.setState(NoteStore.currentNote());
  },
  handleInput (event) {
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
  delete() {
    console.log(`Note says: deleting note with id ${this.state.id}`);
    NoteActions.deleteNote(this.state.id);
  },
  render () {
    if ( this.state.title === undefined ) {
      return (
        <div id="note-splash" className="note">Open A Note!</div>
      );
    } else {
      return (
        <div className="note">
          <header>
            <span>options...</span>
            <button onClick={this.delete}>delete</button>
          </header>
          <input type="text" className="title" value={this.state.title} onChange={this.handleInput}/>
          <textarea className="body" value={this.state.body} onChange={this.handleInput} />
        </div>
      );
    }
  }
});

module.exports = Note;
