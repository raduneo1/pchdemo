import React, { Component } from 'react';
import Search from './Search'
import { Link, withRouter } from 'react-router-dom'
import { InputText } from 'primereact/components/inputtext/InputText';
import { Button } from 'primereact/components/button/Button';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class Header extends Component {
    render() {
      return (
	  	  <header>
		    <nav>
	          <div className="ui-g ui-fluid">
	              <div className="ui-g-12 ui-md-4">
	                  <div className="ui-inputgroup">
	                      <Button icon="pi pi-home" cornerStyleClass="ui-button-secondary"><Link to='/'>Reviews</Link></Button>
	                      <Button icon="pi pi-search" cornerStyleClass="ui-button-secondary"><Link to='/search'>Search</Link></Button>
	                      <Button icon="pi pi-star" cornerStyleClass="ui-button-secondary"><Link to='/movies'>My Movies</Link></Button>
	                  </div>
	              </div>
	          </div>
		    </nav>
	     </header>
        )
    }
}

export default Header;