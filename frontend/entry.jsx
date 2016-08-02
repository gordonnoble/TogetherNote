const React = require('react');
const ReactDOM = require('react-dom');
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
const App = require('./components/app.jsx');
const SignupForm = require('./components/session/signup_form');
const LoginForm = require('./components/session/login_form');
const SessionActions = require('./actions/session_actions');
const SessionStore = require('./stores/session_store');

const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <Route path='/signup' component={SignupForm} />
      <Route path='/login' component={LoginForm} />
    </Route>
  </Router>
);

// const _ensureLoggedIn = function(nextState, replace) {
//   debugger
//   if ( !SessionStore.isLoggedIn() ) {
//     replace('/signup');
//   }
// };

document.addEventListener("DOMContentLoaded", () => {
  let root = document.getElementById("root");
  SessionActions.receiveCurrentUser(window.currentUser);
  ReactDOM.render(routes, root);
});
