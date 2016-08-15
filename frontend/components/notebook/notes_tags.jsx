const React = require('react');
const DisplayStore = require('../../stores/display_store');
const DisplayActions = require('../../actions/display_actions');

const NotesTags = React.createClass({
  componentDidMount() {
    this.displayListener = DisplayStore.addListener(this.toggleOpen);

    $(document).on('click', function(event) {
      if (!$(event.target).closest('#notes-tags').length) {
        DisplayActions.closeNotesTags();
      }
    });
  },
  componentWillUnmount() {
    this.displayListener.remove();
  },
  toggleOpen() {
    let drawer = document.getElementById("notes-tags");

    if (DisplayStore.areNotesTagsVisible()) {
      drawer.className = "clearfix show";
    } else {
      drawer.className = "clearfix hide";
    }
  },
  render() {
    return (
      <div id="notes-tags" className="hide">
        <ul id="notes-tags-list">
          {
            this.props.tags.map( tag =>
              <li className="note-tag-item" key={tag.id}>{tag.name}</li>)
          }
        </ul>
      </div>
    );
  }
});

module.exports = NotesTags;
