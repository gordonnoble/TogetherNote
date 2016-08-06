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

    return(
      <li className="notebook-index-item clearfix" onClick={this.openNotebook}>
        <h4>{this.props.notebook.name}</h4>
        <button className={buttonClass} onClick={this.delete}><img className="recycling" src={window.recycling} /></button>
      </li>
    );
  }
});

module.exports = NotebookIndexItem;
