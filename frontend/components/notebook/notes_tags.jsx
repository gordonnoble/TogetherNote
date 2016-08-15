const React = require('react');
const DisplayStore = require('../../stores/display_store');
const DisplayActions = require('../../actions/display_actions');
const NoteTagItem = require('./note_tag_item');

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
    let header = (this.props.tags.length === 0) ? "No Tags On This Note" : "This Note's Tags";
    let tags = this.props.tags.map( tag =>
      <NoteTagItem key={tag.id} tag={tag} noteId={this.props.noteId}/>
    );

    return (
      <div id="notes-tags" className="hide">
        <h2>{header}</h2>
        <ul id="notes-tags-list">
          { tags }
        </ul>
      </div>
    );
  }
});

module.exports = NotesTags;
