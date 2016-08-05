const React = require('react');
const NotebookStore = require('../../stores/notebook_store');
const NotebookActions = require('../../actions/notebook_actions');
const NotebookIndexItem = require('./notebook_index_item');

const NotebookDrawer = React.createClass({
    getInitialState() {
      return({ notebooks: [] });
    },
    componentDidMount() {
      this.listener = NotebookStore.addListener(this.toggleOpen);
      NotebookActions.fetchNotebooks();
    },
    componentWillUnmount() {
      this.listener.remove();
    },
    toggleOpen() {
      let drawer = document.getElementById("notebook-drawer");
      let note = document.getElementsByClassName("note");

      if (NotebookStore.isDrawerOpen()) {
        this.setState({ notebooks: NotebookStore.allNotebooks() });
        drawer.className = "open";
      } else {
        drawer.className = "closed";
      }
    },
    toggleNotebookForm() {
      NotebookActions.toggleForm();
    },
    render() {
      let notebooks = this.state.notebooks.map( notebook =>
        <NotebookIndexItem notebook={notebook} key={notebook.id}/>
        );

      return (
        <div id="notebook-drawer">
          <header>
            <h2>NOTEBOOKS</h2>
            <button onClick={this.toggleNotebookForm}>New Notebook</button>
          </header>
          <ul id="notebook-index">
              {notebooks}
          </ul>
        </div>
      );
    }
});

module.exports = NotebookDrawer;
