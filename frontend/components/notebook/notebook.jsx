const React = require('react');
const SessionStore = require('../../stores/session_store');
const hashHistory = require('react-router').hashHistory;
const NotebookStore = require('../../stores/notebook_store');
const NotebookActions = require('../../actions/notebook_actions');
const NoteIndex = require('./note_index');
const Sidebar = require('./sidebar');

const Notebook = React.createClass({
  getInitialState() {
    let notebook = NotebookStore.currentNotebook();
    return ({ notebook: notebook });
  },
  componentDidMount(){
    this.id = this.props.params.id;
    NotebookStore.addListener(this.updateNotebook);
    NotebookActions.getNotebook(this.id);
  },
  updateNotebook() {
    this.setState({ notebook: NotebookStore.currentNotebook() });
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
