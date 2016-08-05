const React = require('react');
const NotebookActions = require('../../actions/notebook_actions');

const NotebookIndexItem = React.createClass({
  openNotebook() {
    NotebookActions.fetchNotebook(this.props.notebook.id);
    NotebookActions.toggleDrawer();
  },
  render() {
    return(
      <li className="notebook-index-item" onClick={this.openNotebook}>
        <h4>{this.props.notebook.name}</h4>
      </li>
    );
  }
});

module.exports = NotebookIndexItem;
