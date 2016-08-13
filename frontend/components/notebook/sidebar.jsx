const React = require('react');
const DisplayActions = require('../../actions/display_actions');
const SessionActions = require('../../actions/session_actions');
const SessionStore = require('../../stores/session_store');

const Sidebar = React.createClass({
  getInitialState() {
    let user = SessionStore.currentUser();
    return({ user_avatar: user.image_url });
  },
  componentDidMount() {
    this.listener = SessionStore.addListener(this.updateAvatar);
  },
  componentWillUnmount() {
    this.listener.remove();
  },
  updateAvatar() {
    let user = SessionStore.currentUser();
    this.setState({ user_avatar: user.image_url });
  },
  logout (event) {
    event.preventDefault();
    SessionActions.logout();
  },
  openNotebookDrawer(event) {
    DisplayActions.openNotebookDrawer();
  },
  openTagDrawer(event) {
    DisplayActions.openTagDrawer();
  },
  showAccount(event) {
    event.preventDefault();
    document.getElementById("account-edit").className="show";
  },
  render() {
    return (
      <div id="sidebar">
        <img className="logo" src={window.logo} />
        <button onClick={this.openNotebookDrawer} id="notebook-drawer-button"><img className="notebooks" src={window.notebooks} /></button>
        <button onClick={this.openTagDrawer} id="tag-drawer-button"><img className="tags-button" src={window.tags} /></button>
        <img id="avatar" src={this.state.user_avatar} onClick={this.showAccount}></img>
        <button onClick={this.logout} className="logout">logout</button>
      </div>
    );
  }
});

module.exports = Sidebar;
