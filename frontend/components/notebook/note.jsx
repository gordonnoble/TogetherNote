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
    this.noteListener = NoteStore.addListener(this.switchNote);
  },
  switchNote() {
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
  render () {
    if ( this.state.title === undefined ) {
      return (
        <div id="note-splash" className="note">Open A Note!</div>
      );
    } else {
      return (
        <div className="note">
          <input type="text" className="title" value={this.state.title} onChange={this.handleInput} onBlur={this.save}/>
          <textarea className="body" value={this.state.body} onChange={this.handleInput} onBlur={this.save} />
        </div>
      );
    }
  }
});

module.exports = Note;
