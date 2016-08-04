const React = require('react');
const ReactDOM = require('react-dom');
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
const SignupForm = require('./components/session/signup_form');
const LoginForm = require('./components/session/login_form');
const SessionActions = require('./actions/session_actions');
const SessionStore = require('./stores/session_store');
const Notebook = require('./components/notebook/notebook');

window.NotebookActions = require('./actions/notebook_actions');
window.NotebookStore = require('./stores/notebook_store');
window.NoteStore = require('./stores/note_store');
window.SessionStore = SessionStore;

const _ensureLoggedIn = function(nextState, replace) {
  if ( !SessionStore.isLoggedIn() ) {
    replace('/signup');
  }
};

const _redirectIfLoggedIn = function(nextState, replace) {
  if ( SessionStore.isLoggedIn() ) {
    let notebookId = SessionStore.currentUser().open_notebook_id;
    replace(`/notebooks/${notebookId}`);
  }
};

const _redirect = function (nextState, replace) {
  replace(`/notebooks/${window.currentUser.open_notebook_id}`);
};

const routes = (
  <Router history={hashHistory}>
    <Route path='/' onEnter={_redirect} />
    <Route path='/notebooks/:id' component={Notebook} onEnter={_ensureLoggedIn} />
    <Route path='/signup' component={SignupForm} />
    <Route path='/login' component={LoginForm} onEnter={_redirectIfLoggedIn}/>
  </Router>
);


document.addEventListener("DOMContentLoaded", () => {
  let root = document.getElementById("root");
  SessionActions.receiveCurrentUser(window.currentUser);
  ReactDOM.render(routes, root);
});
