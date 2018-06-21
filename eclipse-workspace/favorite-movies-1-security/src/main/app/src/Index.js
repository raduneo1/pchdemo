import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header'
import Main from './Main'
import { BrowserRouter } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header/>
          <Main/>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
	<App loggedInManager={document.getElementById('managername').innerHTML } />,
	document.getElementById('react')
)

