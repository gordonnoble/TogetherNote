const React = require('react');

const NotebookIndexItem = React.createClass({
  render() {
    return(
      <li className="notebook-index-item">
        <h4>{this.props.notebook.title}</h4>
      </li>
    );
  }
});

module.exports = NotebookIndexItem;
