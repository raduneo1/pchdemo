import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App'

//loggedInManager={document.getElementById('managername').innerHTML }
ReactDOM.render(
	<App loggedInManager={document.getElementById('managername').innerHTML }/>,
	document.getElementById('react')
)

