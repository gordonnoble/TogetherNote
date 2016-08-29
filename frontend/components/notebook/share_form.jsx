const React = require('react');
const NoteActions = require('../../actions/note_actions');
const SessionActions = require('../../actions/session_actions');
const SessionStore = require('../../stores/session_store');

const ShareForm = React.createClass({
  getInitialState() {
    return { username: "", matchingUsernames: [] };
  },
  componentDidMount() {
    this.listener = SessionStore.addListener(this.setMatchingUsernames);
  },
  componentWillUnmount() {
    this.listener.remove();
  },
  setMatchingUsernames() {
    this.setState({ matchingUsernames: SessionStore.allMatchingUsernames()});
  },
  shareNote(event) {
    event.preventDefault();
    NoteActions.shareNote(this.props.noteId, this.state.username);
    let confirmation = document.getElementById("share-confirmation");
    confirmation.className = "show";
    this.setState({ username: "", matchingUsernames: [] });
    setTimeout(() => confirmation.className = "hide", 2000);
  },
  handleShareInput(event) {
    let username = event.target.value;
    if (username === "") {
      this.setState({ username: username, matchingUsernames: [] });
    } else {
      SessionActions.searchUsers(username);
      this.setState({ username: username });
    }
  },
  clearSharePlaceholder() {
    document.getElementById("tag-input").placeholder = "";
  },
  resetSharePlaceholder() {
    document.getElementById("tag-input").placeholder = "share it";
  },
  clickSuggestion(event) {
    this.setState({ username: event.target.innerHTML }, () => this.shareNote(event));
  },
  render() {
    return (
      <div id="share-input-box" autoComplete="off">
        <form id="share-form" onSubmit={this.shareNote}>
          <img id="share-label" src={window.share} />
          <input id="share-input" type="text" placeholder="share it" onFocus={this.clearSharePlaceholder}
            onBlur={this.resetSharePlaceholder} onChange={this.handleShareInput} value={this.state.username}
            autoComplete="off"/>
          <span id="share-confirmation" className="hide">shared</span>
        </form>

        <ul id="matching-users">
          {
            this.state.matchingUsernames.map( username =>
              <li className='matching-user' key={username} onClick={this.clickSuggestion}>{username}</li>
            )
          }
        </ul>
      </div>
    );
  }
});

module.exports = ShareForm;
