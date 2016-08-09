const React = require('react');
const TagActions = require('../../actions/tag_actions');
const TagStore = require('../../stores/tag_store');
const TagIndexItem = require('./tag_index_item');
const DisplayStore = require('../../stores/display_store');
const DisplayActions = require('../../actions/display_actions');

const TagDrawer = React.createClass({
  getInitialState() {
    return({ tags: [] });
  },
  componentDidMount() {
    this.tagListener = TagStore.addListener(this.updateTags);
    this.displayListener = DisplayStore.addListener(this.toggleOpen);

    $(document).on('click', function(event) {
      if (!$(event.target).closest('#tag-drawer').length) {
        DisplayActions.closeTagDrawer();
      }
    });

    TagActions.fetchAll();
  },
  componentWillUnmount() {
    this.tagListener.remove();
    this.displayListener.remove();
  },
  updateTags(){
    this.setState({ tags: TagStore.all() });
  },
  toggleOpen() {
    let drawer = document.getElementById("tag-drawer");

    if (DisplayStore.isTagDrawerOpen()) {
      drawer.className = "clearfix open";
    } else {
      drawer.className = "clearfix closed";
    }
  },
  render() {
    let tags = this.state.tags.map( tag =>
      <TagIndexItem tag={tag} key={tag.id}/>
      );

    return (
      <ul id="tag-drawer" className="clearfix closed">
        <h2>ALL TAGS</h2>
        {tags}
      </ul>
    );
  }
});

module.exports = TagDrawer;
