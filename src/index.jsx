import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';
import './index.scss';

import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDhdm6q4mqKnhhRafUqlpMpQYz2_jqoKRQ",
    authDomain: "stackoverformatics.firebaseapp.com",
    databaseURL: "https://stackoverformatics.firebaseio.com",
    storageBucket: "stackoverformatics.appspot.com",
    messagingSenderId: "26938828609"
};
firebase.initializeApp(config);

firebase.auth().signInAnonymously().catch(function(error) {
  console.error(error);
});


ReactDOM.render(
	<App />,
	document.getElementById('mainReactApp')
);
