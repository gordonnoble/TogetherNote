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
      hashHistory.push('/');
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
    this.setState({ username: "", password: "" });
  },
  render() {
    let errors;
    if (this.state.errors.length > 0) {
      errors =  <ul className="errors">
                  {this.state.errors.map( error => <li key={error}>{error}</li>)}
                </ul>;
    } else {
      errors = <div></div>;
    }

    return (
      <div id="login-page">
        <header>
          <li><Link to='/signup'>Sign Up</Link></li>
        </header>

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
          <button>Login</button>
        </form>
      </div>
    );
  }
});

module.exports = LoginForm;
