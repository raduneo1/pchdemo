import React, { Component } from 'react';
import Search from './Search'
import { Link, withRouter } from 'react-router-dom'
import { InputText } from 'primereact/components/inputtext/InputText';
import { Button } from 'primereact/components/button/Button';



class Nav extends Component {
    render() {
      return (
	  	  <header>
		    <nav>
	          <div className="ui-g ui-fluid">
	              <div className="ui-g-12 ui-md-4">
	                  <div className="ui-inputgroup">
	                      <Button icon="fa fa-search" cornerStyleClass="ui-button-secondary"><Link to='/'>Search</Link></Button> 
	                      <Button icon="fa fa-newspaper-o" cornerStyleClass="ui-button-secondary"><Link to='/reviews'>Reviews</Link></Button>
	                      <Button icon="fa fa-star" cornerStyleClass="ui-button-secondary"><Link to='/movies'>My Movies</Link></Button>
	                  </div>
	              </div>
	          </div>
		    </nav>
	     </header>
        )
    }
}

export default Nav;