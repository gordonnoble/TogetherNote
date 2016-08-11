const React = require('react');
const SessionActions = require('../../actions/session_actions');
const ErrorStore = require('../../stores/error_store');
const SessionStore = require('../../stores/session_store');
const hashHistory = require('react-router').hashHistory;
const Link = require('react-router').Link;

const SignupForm = React.createClass({
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
    let errors = ErrorStore.errors("signup");
    this.setState({ errors: errors });
  },
  redirectIfLoggedIn(){
    if (SessionStore.isLoggedIn()) {
      let id = SessionStore.currentUser().open_notebook_id;
      hashHistory.push(`/notebooks/${id}`);
    }
  },
  logInGuest() {
    SessionActions.logInGuest();
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
    SessionActions.signup(user);
  },
  clearUsernamePlaceholder() {
    $("#signup-username").attr("placeholder", "");
  },
  clearPasswordPlaceholder() {
    $("#signup-password").attr("placeholder", "");
  },
  resetUsernamePlaceholder() {
    $("#signup-username").attr("placeholder", 'Username');
  },
  resetPasswordPlaceholder() {
    $("#signup-password").attr("placeholder", 'Password');
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
      <div className="signup-in-page">
        <div className="signup-in-box">
          <h1>Create Account</h1>

            {errors}

          <form onSubmit={this.submit}>

            <input type="text"
              onChange={this.updateUsername}
              className="signup-in-input"
              value={this.state.username}
              id="signup-username"
              placeholder="Username"
              onFocus={this.clearUsernamePlaceholder}
              onBlur={this.resetUsernamePlaceholder}
              />

            <input type="password"
              onChange={this.updatePassword}
              className="signup-in-input"
              value={this.state.password}
              id="signup-password"
              placeholder="Password"
              onFocus={this.clearPasswordPlaceholder}
              onBlur={this.resetPasswordPlaceholder}
              />

            <button className="signup-in-input signup-in-button" type="submit">Create Account</button>
          </form>
            <button id="guest-login" onClick={this.logInGuest}>Try It Out</button>

            <div className="signup-in-link">
              <span>Already have an account?</span>
              <br></br>
              <Link to="/login">Log In</Link>
            </div>
          </div>

          <video autoPlay muted loop id="bgvid">
            <source src={window.introVideo} type="video/webm"/>
          </video>
      </div>
    );
  }
});

module.exports = SignupForm;
