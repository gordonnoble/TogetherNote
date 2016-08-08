const React = require('react');
const NoteActions = require('../../actions/note_actions');
const DisplayActions = require('../../actions/display_actions');

const TagIndexItem = React.createClass({
  searchByTag(event) {
    NoteActions.searchByTag(this.props.tag.id);
    DisplayActions.closeTagDrawer();
  },
  render() {
    return (
      <li className="tag-index-item" onClick={this.searchByTag}>
        {this.props.tag.name}
      </li>
    );
  }
});

module.exports = TagIndexItem;
