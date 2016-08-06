const React = require('react');
const NotebookStore = require('../../stores/notebook_store');
const NotebookActions = require('../../actions/notebook_actions');
const NotebookIndexItem = require('./notebook_index_item');
const DisplayActions = require('../../actions/display_actions');
const DisplayStore = require('../../stores/display_store');

const NotebookDrawer = React.createClass({
    getInitialState() {
      return({ notebooks: [] });
    },
    componentDidMount() {
      this.displayListener = DisplayStore.addListener(this.toggleOpen);

      $(document).on('click', function(event) {
        if (!$(event.target).closest('#notebook-drawer').length) {
          DisplayActions.closeDrawer();
        }
      });

      NotebookActions.fetchNotebooks();
    },
    componentWillUnmount() {
      this.displayListener.remove();
      this.notebookListener.remove();
    },
    toggleOpen() {
      let drawer = document.getElementById("notebook-drawer");
      let note = document.getElementsByClassName("note");

      if (DisplayStore.isNotebookDrawerOpen()) {
        this.setState({ notebooks: NotebookStore.allNotebooks() });
        drawer.className = "open";
      } else {
        this.setState({ notebooks: NotebookStore.allNotebooks() });
        drawer.className = "closed";
      }
    },
    showNotebookForm() {
      DisplayActions.showNotebookForm();
    },
    render() {
      let notebooks = this.state.notebooks.map( notebook =>
        <NotebookIndexItem notebook={notebook} key={notebook.id}/>
        );

      return (
        <div id="notebook-drawer" className="closed">
          <header>
            <h2>NOTEBOOKS</h2>
            <button onClick={this.showNotebookForm}><img className="new-notebook" src={window.newNote} /></button>
          </header>
          <ul id="notebook-index">
              {notebooks}
          </ul>
        </div>
      );
    }
});

module.exports = NotebookDrawer;
