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
  update(event) {
    let newState = this.state;
    newState[event.target.className] = event.target.value;
    this.setState(newState);
  },
  submit(event) {
    event.preventDefault();
    let user = { username: this.state.username, password: this.state.password };
    SessionActions.login(user);
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
      <div id="signup-page">

        <h1>Log In</h1>

        {errors}

        <form onSubmit={this.submit}>

          <input type="text"
            onChange={this.update}
            className="username"
            value={this.state.username}
            placeholder="Username"
            />

          <input type="password"
            onChange={this.update}
            className="password"
            value={this.state.password}
            placeholder="Password"
            />

          <input id="signup-button" type="submit" value="Log In" />

        </form>
          <div id="login-link">
            <span>Don't have an account?</span>
            <br></br>
            <Link to='/signup'>Create One</Link>
            </div>

      </div>
    );
  }
});

module.exports = LoginForm;
