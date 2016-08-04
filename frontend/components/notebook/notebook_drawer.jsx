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

      if (NotebookStore.isDrawerOpen()) {
        this.setState({ notebooks: NotebookStore.allNotebooks() });
        drawer.style.visibility = "visible";
      } else {
        drawer.style.visibility = "hidden";
      }
    },
    render() {
      let notebooks = this.state.notebooks.map( notebook =>
        <NotebookIndexItem notebook={notebook} />
        );

      return (
        <div id="notebook-drawer">
          <h3>NOTEBOOKS</h3>
          <ul>
              {notebooks}
          </ul>
        </div>
      );
    }
});

module.exports = NotebookDrawer;
