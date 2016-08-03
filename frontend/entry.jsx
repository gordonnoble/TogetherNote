const React = require('react');
const ReactDOM = require('react-dom');
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
const App = require('./components/app.jsx');
const SignupForm = require('./components/session/signup_form');
const LoginForm = require('./components/session/login_form');
const SessionActions = require('./actions/session_actions');
const SessionStore = require('./stores/session_store');
const Notebook = require('./components/notebook/notebook');
window.SessionStore = SessionStore;

const _ensureLoggedIn = function(nextState, replace) {
  if ( !SessionStore.isLoggedIn() ) {
    replace('/signup');
  }
};

const _redirectIfLoggedIn = function(nextState, replace) {
  if ( SessionStore.isLoggedIn() ) {
    replace('/');
  }
};

const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Notebook} onEnter={_ensureLoggedIn} />
      <Route path='/signup' component={SignupForm} />
      <Route path='/login' component={LoginForm} onEnter={_redirectIfLoggedIn}/>
    </Route>
  </Router>
);


document.addEventListener("DOMContentLoaded", () => {
  let root = document.getElementById("root");
  SessionActions.receiveCurrentUser(window.currentUser);
  ReactDOM.render(routes, root);
});
