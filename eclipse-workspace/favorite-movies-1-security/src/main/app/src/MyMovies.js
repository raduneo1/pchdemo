import React, { Component } from 'react';
import Movie from "./Movie"
import { getReqREST } from "./Utils"
import { GET_REST_MY_MOVIES_URL } from './Const'
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
import {Button} from 'primereact/components/button/Button';
import {InputText} from 'primereact/components/inputtext/InputText';
import {OverlayPanel} from 'primereact/components/overlaypanel/OverlayPanel';

class MyMovies extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            error: {}
        }
        
        this.getMyMovies = this.getMyMovies.bind(this);
        this.rowExpansionTemplate = this.rowExpansionTemplate.bind(this);
    }
    
    componentDidMount() {
    	this.getMyMovies();
    }

    getMyMovies() {
        getReqREST(GET_REST_MY_MOVIES_URL)
        .then(response => response.json())
        .then(data => {
            const movies = [];
            data._embedded.movies.forEach(movie => {
                movies.push({
                	title: movie.title,
                	genre: movie.genre,
                	year: movie.year, 
                	rating: movie.rating + '/10', 
                	movieId: movie.movieId
                });
            })
            this.setState({ movies: movies});
        	console.log("GETTING MOVIES");
        })
        .catch(error => this.setState({ error }));
    }
    
    rowExpansionTemplate(data) {
        return (
			<div className="ui-g ui-fluid">
	           <div>
	             <Movie movieId={data.movieId} 
	                    updateMovies={this.getMyMovies}
	                    imgBaseUrl={this.props.imgBaseUrl}/>
	           </div>
	        </div>
	        );
    }
    
    render() {
	    const header = <div style={{'textAlign':'left'}}>
	        <div>
	             <h3><span className="ui-inputgroup-addon">
	                   <i className="fa fa-film"></i></span> 
	                   &nbsp; My Movies 
	             </h3> 
	        </div>

	        <div className="ui-inputgroup">
		        <span className="ui-inputgroup-addon"><i className="fa fa-search"></i></span>
		        <InputText type="search" onInput={(e) => this.setState({globalFilter: e.target.value})} 
		                   placeholder="Global Search" size="30"/>
	        </div>
	    </div>;
	    
    	return (
            <div className="content-section implementation">
	            <DataTable value={this.state.movies} globalFilter={this.state.globalFilter} 
	                       header={header} 
	                       expandedRows={this.state.expandedRows} 
	                       onRowToggle={(e) => this.setState({expandedRows:e.data})}
	                       rowExpansionTemplate={this.rowExpansionTemplate}>
	                <Column expander={true} style={{width: '2em'}} />
	                <Column field="title" header="Title" sortable={true}/>
	                <Column field="year" header="Year" sortable={true}/>
	                <Column field="genre" header="Genre" sortable={true}/>
	                <Column field="rating" header="Rating" sortable={true}/>
	            </DataTable>
            </div>
    	  )
    }
}

export default MyMovies;