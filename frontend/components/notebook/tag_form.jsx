const React = require('react');
const TagActions = require('../../actions/tag_actions');
const TagStore = require('../../stores/tag_store');

const TagForm = React.createClass({
  getInitialState() {
    return { tagName: "", matchingTags: [] };
  },
  componentDidMount() {
    TagActions.fetchAll();
  },
  clearTagPlaceholder() {
    document.getElementById("tag-input").placeholder = "";
  },
  resetTagPlaceholder() {
    document.getElementById("tag-input").placeholder = "tag it";
  },
  submitNewTag(event) {
    event.preventDefault();
    TagActions.tagNote(this.props.noteId, this.state.tagName);
    let confirmation = document.getElementById("tag-confirmation");
    confirmation.className = "show";
    this.setState({ tagName: "", matchingTags: [] });
    setTimeout(() => confirmation.className = "hide", 2000);
  },
  handleTagInput(event) {
    let tagName = event.target.value;
    if (tagName === "") {
      this.setState({ tagName: tagName, matchingTags: [] });
    } else {
      let matchingTags = TagStore.all().filter( tag => tag.name.toLowerCase().includes(tagName));
      this.setState({ tagName: tagName, matchingTags: matchingTags });
    }
  },
  clickSuggestion(event) {
    this.setState({ tagName: event.target.innerHTML }, () => this.submitNewTag(event) );
  },
  render() {
    return (
      <div id="tag-input-box" autoComplete="off">
        <form id="tag-form" onSubmit={this.submitNewTag}>
          <img id="tag-label" src={window.tag} />
          <input id="tag-input" type="text" placeholder="tag it" onFocus={this.clearTagPlaceholder}
            onBlur={this.resetTagPlaceholder} onChange={this.handleTagInput} value={this.state.tagName}
            autoComplete="off" />
          <span id="tag-confirmation" className="hide">tagged</span>
        </form>

        <ul id="matching-tags">
          {
            this.state.matchingTags.map( tag =>
            <li className="matching-tag" onClick={ this.clickSuggestion} key={tag.name}>{tag.name}</li>)
          }
        </ul>
      </div>
    );
  }
});

module.exports = TagForm;
