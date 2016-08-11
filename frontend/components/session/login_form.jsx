const React = require('react');
const SessionActions = require('../../actions/session_actions');
const ErrorStore = require('../../stores/error_store');
const SessionStore = require('../../stores/session_store');
const hashHistory = require('react-router').hashHistory;
const Link = require('react-router').Link;

const LoginForm = React.createClass({
  getInitialState() {
    return({ username: "", password: "", errors: [] });
  },
  componentDidMount() {
    this.errorListener = ErrorStore.addListener(this.displayErrors);
    this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn);
  },
  componentWillUnmount() {
    this.errorListener.remove();
    this.sessionListener.remove();
  },
  displayErrors() {
    let errors = ErrorStore.errors("login");
    this.setState({ errors: errors });
  },
  redirectIfLoggedIn(){
    if (SessionStore.isLoggedIn()) {
      let id = SessionStore.currentUser().open_notebook_id;
      hashHistory.push(`/notebooks/${id}`);
    }
  },
  updateUsername(event) {
    this.setState({ username: event.target.value });
  },
  updatePassword(event) {
    this.setState({ password: event.target.value });
  },
  submit(event) {
    event.preventDefault();
    let user = { username: this.state.username, password: this.state.password };
    SessionActions.login(user);
  },
  clearUsernamePlaceholder() {
    $("#login-username").attr("placeholder", "");
  },
  clearPasswordPlaceholder() {
    $("#login-password").attr("placeholder", "");
  },
  resetUsernamePlaceholder() {
    $("#login-username").attr("placeholder", 'Username');
  },
  resetPasswordPlaceholder() {
    $("#login-password").attr("placeholder", 'Password');
  },
  render() {
    let errors;
    if (this.state.errors.length > 0) {
      errors =  <ul className="errors">
                  {this.state.errors.map( error => <li key={error}>{error}</li>)}
                </ul>;
    } else {
      errors = <div style={{ display: 'none' }}></div>;
    }

    return (
      <div className="signup-in-page login-page">
        <div className="signup-in-box login-box">
          <h1>Log In</h1>
          <img className="logo" src={window.logo} />
          {errors}

          <form onSubmit={this.submit}>

            <input type="text"
              onChange={this.updateUsername}
              className="signup-in-input"
              id="login-username"
              value={this.state.username}
              placeholder="Username"
              onFocus={this.clearUsernamePlaceholder}
              onBlur={this.resetUsernamePlaceholder}
              />

            <input type="password"
              onChange={this.updatePassword}
              className="signup-in-input"
              value={this.state.password}
              id="login-password"
              placeholder="Password"
              onFocus={this.clearPasswordPlaceholder}
              onBlur={this.resetPasswordPlaceholder}
              />

            <button className="signup-in-input signup-in-button" type="submit">Log In</button>

          </form>
            <div className="signup-in-link signup-link">
              <span>Don't have an account?</span>
              <Link to='/signup'>Create One</Link>
              </div>
            </div>
      </div>
    );
  }
});

module.exports = LoginForm;
