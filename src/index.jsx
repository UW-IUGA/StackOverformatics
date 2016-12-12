import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import Main from './main';
import Login from './login';
import './index.scss';

import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDhdm6q4mqKnhhRafUqlpMpQYz2_jqoKRQ",
    authDomain: "stackoverformatics.firebaseapp.com",
    databaseURL: "https://stackoverformatics.firebaseio.com",
    storageBucket: "stackoverformatics.appspot.com",
    messagingSenderId: "26938828609"
};
firebase.initializeApp(config);

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Main}/>
      <Route path="login" component={Login}/>
    </Route>
  </Router>,
	document.getElementById('mainReactApp')
);
