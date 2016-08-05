const React = require('react');
const DisplayActions = require('../../actions/display_actions');
const NotebookActions = require('../../actions/notebook_actions');

const NotebookIndexItem = React.createClass({
  openNotebook() {
    NotebookActions.fetchNotebook(this.props.notebook.id);
    DisplayActions.closeDrawer();
  },
  delete(event) {
    NotebookActions.deleteNotebook(this.props.notebook.id);
    NotebookActions.fetchNotebook();
  },
  render() {
    let buttonClass = (this.props.notebook.removable) ? "deletable" : "permanent";
    console.log(this.props.notebook.removable);
    console.log(this.props.notebook.name);
    
    return(
      <li className="notebook-index-item" onClick={this.openNotebook}>
        <h4>{this.props.notebook.name}</h4>
        <button className={buttonClass} onClick={this.delete}>delete</button>
      </li>
    );
  }
});

module.exports = NotebookIndexItem;
