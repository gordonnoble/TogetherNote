const React = require('react');
const SessionStore = require('../../stores/session_store');
const hashHistory = require('react-router').hashHistory;
const NotebookStore = require('../../stores/notebook_store');
const NotebookActions = require('../../actions/notebook_actions');
const NoteIndex = require('./note_index');
const Sidebar = require('./sidebar');

const Notebook = React.createClass({
  getInitialState() {
    this.id = this.props.params.id;
    return ({ notebook: {} });
  },
  componentDidMount(){
    NotebookStore.addListener(this.updateNotebook);
    NotebookActions.getNotebook(this.id);
  },
  updateNotebook() {
    let notebook = NotebookStore.currentNotebook();
    let openNoteId = notebook.notes[0].id;
    this.setState({ notebook: notebook, openNoteId: openNoteId });
  },
  render () {
    return (
      <div id="notebook">
        <Sidebar />

        <NoteIndex notes={this.state.notebook.notes} />

        <div id="note"></div>
      </div>
    );
  }
});

module.exports = Notebook;
