import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import postData from "./Utils"
import Movie from "./Movie"
import { InputText } from 'primereact/components/inputtext/InputText';
import { Button } from 'primereact/components/button/Button';
import { AutoComplete } from 'primereact/components/autocomplete/AutoComplete';
import { SEARCH_TMDB_MOVIES_BY_TITLE_URL } from './Const'

  
class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            titles: [],
            error: null,
            location: this.props.location
        }
        this.handleSearchButton = this.handleSearchButton.bind(this);
        this.handleSelectMovie = this.handleSelectMovie.bind(this);
    }
    
    handleSearchButton(event) {
    	setTimeout(() => {
	        fetch(SEARCH_TMDB_MOVIES_BY_TITLE_URL + event.query)
	        .then(response => response.json())
	        .then(data => {
	            const movies = [];
	            const titles = [];
	            data.results.forEach(movie => {
	            	const titleWithYear = movie.title + " - " + movie.release_date.slice(0, 4);
	            	titles.push(titleWithYear);
	            	// Second array, 'movies', created solely to keep track of movieIds
	            	//   (PrimeReact 'AutoComplete' component does not allow storing objects)
	                movies.push({title: titleWithYear, movieId: movie.id});
	            })
	            this.setState({ movies: movies, titles: titles, selected: false});
	        })
	        .catch(error => this.setState({ error }));
    	}, 50);
    }
    
    handleSelectMovie(event) {
    	const selectedMovie = this.state.movies.filter(movie => {
    		return (movie.title === event.value);
    	});
    	
    	this.setState({movieId: selectedMovie[0].movieId});
    }

    render() {
        return (
            <div>
                <div className="ui-inputgroup">
	                <span className="ui-inputgroup-addon"><i className="fa fa-film"></i></span>
	                <AutoComplete value={this.state.title} 
	                              onChange={(event) => this.setState({title: event.value})}
	                              onSelect={this.handleSelectMovie}
	                              placeholder="Enter movie name..."
	                              suggestions={this.state.titles} 
	                              minLength={1}
	                              completeMethod={this.handleSearchButton}/>
                </div>
                <br /><br />
                { (this.state.movieId > 0) ? 
                		<Movie movieId={this.state.movieId} 
                               updateMovies={null} 
                               imgBaseUrl={this.props.imgBaseUrl}/> : null
                }
            </div>
        )
    }
}

export default Search;