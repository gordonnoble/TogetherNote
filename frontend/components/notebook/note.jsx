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
    let note = NoteStore.currentNote();
    this.setState(note);
  },
  handleInput (event) {
    let newState = {};
    newState[event.target.className] = event.target.value;
    this.setState(newState);
    clearTimeout(this.timer);
    this.timer = setTimeout(this.save, 3000);
  },
  save() {
    if (this.state.id !== undefined) {
      NoteActions.pushNote(this.state);
    }
  },
  render () {
    return (
      <div id="note">
        <div className="title">{this.state.title}</div>
        <textarea className="body" value={this.state.body} onChange={this.handleInput} />
      </div>
    );
  }
});

module.exports = Note;
