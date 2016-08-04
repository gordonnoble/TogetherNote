const React = require('react');
const NoteActions = require('../../actions/note_actions');

const Note = React.createClass({
  timer: setTimeout(()=>{}, 0),

  getInitialState() {
    let note = this.props.note || {};
    return ({ title: note.title, body: note.body, id: note.id });
  },
  componentWillReceiveProps(newProps){
    NoteActions.updateNote(this.state);
    this.setState({ title: newProps.note.title, body: newProps.note.body });
  },
  handleInput (event) {
    let key = event.target.className;
    this.setState({ key: event.target.value });
    clearTimeout(this.timer);
    this.timer = setTimeout(this.pushSave, 3000);
  },
  pushSave() {
    NoteActions.updateNote(this.state);
  },
  render () {
    return (
      <div id="note">
        <div className="title">{this.state.title}</div>
        <div className="body">
          <textarea value={this.state.body} onChange={this.handleInput} />
        </div>
      </div>
    );
  }
});

module.exports = Note;
