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
      let drawer = document.getElementById('notebook-drawer');
      let note = document.querySelector('.note');

      if (NotebookStore.isDrawerOpen()) {
        this.setState({ notebooks: NotebookStore.allNotebooks() });
        drawer.style.visibility = "visible";
        drawer.style.transition = "1s";
        drawer.style.display = "flex";
        note.style.filter = "blur(100)";
      } else {
        drawer.style.visibility = "hidden";
        drawer.style.display = "none";
        note.style.filter = "blur(0)";
      }
    },
    render() {
      let notebooks = this.state.notebooks.map( notebook =>
        <NotebookIndexItem notebook={notebook} key={notebook.id}/>
        );

      return (
        <div id="notebook-drawer">
          <h3>NOTEBOOKS</h3>
          <ul id="notebook-index">
              {notebooks}
          </ul>
        </div>
      );
    }
});

module.exports = NotebookDrawer;
