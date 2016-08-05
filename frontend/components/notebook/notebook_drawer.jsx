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
      this.listener = DisplayStore.addListener(this.toggleOpen);
      this.docListener = document.addEventListener("click", this.handleClick);
      NotebookActions.fetchNotebooks();
    },
    componentWillUnmount() {
      this.listener.remove();
      this.docListener.remove();
    },
    handleClick(event){
      let drawer = document.getElementById("notebook-drawer");

      if (event.target !== drawer) {
        DisplayActions.closeDrawer();
      }
    },
    toggleOpen() {
      let drawer = document.getElementById("notebook-drawer");
      let note = document.getElementsByClassName("note");

      if (DisplayStore.isNotebookDrawerOpen()) {
        this.setState({ notebooks: NotebookStore.allNotebooks() });
        drawer.className = "open";
      } else {
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
        <div id="notebook-drawer">
          <header>
            <h2>NOTEBOOKS</h2>
            <button onClick={this.showNotebookForm}>New Notebook</button>
          </header>
          <ul id="notebook-index">
              {notebooks}
          </ul>
        </div>
      );
    }
});

module.exports = NotebookDrawer;
