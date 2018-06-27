import React, { Component } from 'react';
import logo from './logo.svg';
import 'primereact/resources/primereact.min.css';
import 'font-awesome/css/font-awesome.css';
import 'primereact/resources/themes/omega/theme.css';
import './App.css';

import Nav from './Nav'
import Main from './Main'
import { BrowserRouter } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
	        <img src={logo} className="App-logo" alt="logo" />
	        <h1 className="App-title">Favorite movies application</h1>
	      </header>
          <Nav/>
          <Main/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
