import React, { Component } from 'react';
import { GET_REST_MY_MOVIES_URL,
	     SEARCH_REST_MOVIES_BY_MOVIEID_URL,
	     GET_TMDB_MOVIE_URL_1,
	     GET_TMDB_MOVIE_URL_2,
	     TMDB_IMG_SIZE_MED
	   } from './Const'
import {Panel} from 'primereact/components/panel/Panel';
import {Rating} from 'primereact/components/rating/Rating';
import {Button} from 'primereact/components/button/Button';
import {InputTextarea} from 'primereact/components/inputtextarea/InputTextarea';
import { getRatingDescription, postReqREST, getReqREST } from "./Utils"


class Movie extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            average: 0,
            id: -1,
            language: "",
            overview: "",
            release_date: "",
            title: "",
            movieId: this.props.movieId,
            rating: 0,
            review: "",
            isUserInfoModified: false,
            year: "",
            movieURL: ""
        }
        
        this.saveMovie = this.saveMovie.bind(this);
    }
    
    // Necessary, or else selecting another suggestion 
    //   in Autocomplete does not update Movie component
    componentWillReceiveProps(nextProps) {
    	  if (nextProps.movieId !== this.props.movieId) {
    		  this.getMovieInfo(nextProps.movieId);
    	}
    }
    
    componentDidMount() {
    	this.getMovieInfo(this.state.movieId);

    }
    

    
    saveMovie(event, state) {
    	// If the movie does not have a URL (does not exist on the server), then we use POST. Else we use PUT
    	const genre = this.state.genre;
    	const movieUrl = this.state.movieUrl;
    	const movieId = this.state.movieId;
    	const posterPath = this.state.posterPath;
    	const rating = this.state.rating;
    	const review = this.state.review;
    	const title = this.state.title;
    	const year = this.state.year;
    	
    	const hasPutURL = !(movieUrl === null || movieUrl === undefined || movieUrl === "");
    	const method = (hasPutURL) ? 'PUT' : 'POST';
    	const url = (hasPutURL) ? movieUrl : GET_REST_MY_MOVIES_URL;
    	const payload = { genre, movieId, title, year, rating, review, posterPath };
        
    	// 1. Save movie info (POST)
    	postReqREST(url, payload, method)
    	  .then(response => response.json()) // parses response to JSON  
    	  .then(data => {
    		  console.log(data); // JSON from `response.json()` call
    		  this.setState({ isUserInfoModified: false});
    		  
    		  // 2. Get updated parent myMovies info (GET)
    		  if (this.props.updateMovies !== undefined &&
    		      this.props.updateMovies !== null) {
    		     this.props.updateMovies();
    		  }
    	  })
    	  .catch(error => console.error(error))
    }
    
    getMovieInfo(movieId) {
    	// Get movie public info (tmdb)
        fetch(GET_TMDB_MOVIE_URL_1 + movieId + GET_TMDB_MOVIE_URL_2)
          .then(response => response.json())
          .then(data => {
        	const genre = data.genres
        	   .map(g => g.name)
        	   .reduce((genres, genre) => genres + ", " + genre);
        	
        	const director = data.credits.crew.find(person => person.job.toLowerCase() === 'director').name;
        	
            this.setState(
	    		{
                average: data.vote_average,
                director: director,
                genre: genre,
                language: data.spoken_languages[0].name,
                overview: data.overview,
                posterPath: data.poster_path,
                release_date: data.release_date,
                title: data.title,
                year: data.release_date.slice(0, 4)
	            })
          })
          .catch(error => this.setState({ error }));
        
          // 1. Verify if movie exists on REST API and get its URL
          getReqREST(SEARCH_REST_MOVIES_BY_MOVIEID_URL + movieId)
          .then(response => {
        	  if (response.status === 200) {
        		  return response.json();
        	  } else { // Will break promise chain here
                  this.setState(
          	    	{ rating: 0, review: "" }
          	      ); 
        		  throw new Error('The movie does not exist on the server');
        	  }
          })
          .then(data => {
              this.setState(
      	         { movieUrl: data._links.self.href }
      	      );
              console.log(data._links.self.href);
              return data._links.self.href;
          })
          // 2. Get movie user info from REST API
          .then(movieUrl => getReqREST(movieUrl))
          .then(response => response.json())
          .then(data => {
        	  this.setState(
    	    	{ rating: data.rating, review: data.review }
    	      ); 
          })
          .catch(error => this.setState({ error }));
    }
    
    
    render() {
    	const imageUrl = this.props.imgBaseUrl + TMDB_IMG_SIZE_MED + this.state.posterPath;
        console.log("lalala" + imageUrl);
    	return (
	        <Panel header={this.state.title}>
		        <table id="movieTable"
		        	   style={{background: 'url(' + imageUrl + ') no-repeat right top'
		        		       }}>
			        <tbody>
			            <tr>
			              <th>Title:</th>
			              <td>{this.state.title}</td> 
			            </tr>
			            <tr>
			              <th>Release date:</th>
			              <td>{this.state.release_date}</td> 
			            </tr>
			            <tr>
			              <th>Language:</th>
			              <td>{this.state.language}</td> 
			            </tr>
			            <tr>
			              <th>Genre:</th>
			              <td>{this.state.genre}</td> 
			            </tr>
			            <tr>
			              <th>Director:</th>
			              <td>{this.state.director}</td> 
			            </tr>
			            <tr>
			              <th>Average:</th>
			              <td>{this.state.average}</td> 
			            </tr>
			            <tr>
			              <th>Your rating:</th>
			              <td><span><Rating value={this.state.rating}
                                      stars={10}
			                          onChange={event => this.setState({ rating: event.value, 
			                        	                                 isUserInfoModified: true })} />
			                  {'(' + getRatingDescription(this.state.rating) + ')'}
                              </span>
			              </td> 
			            </tr>
			            <tr>
			              <th>Overview:</th>
			              <td><br /><br /><br />{this.state.overview}</td> 
			            </tr>
			            <tr>
			              <th>Review:</th>
			              <td><br/><InputTextarea rows={2} cols={60} autoResize={true} maxLength={20}
			                                 value={this.state.review}
			                                 onChange={(event) => this.setState({ review: event.target.value, 
			                                	                                  isUserInfoModified: true })} />
			              </td> 
			            </tr>
			            <tr>
			              <th></th>
			              <td><Button icon="fa-check" cornerStyleClass="ui-button-success"
			            	          disabled={!this.state.isUserInfoModified}
			                          onClick={this.saveMovie}>
			                    Save
			                  </Button>
			              </td>
			            </tr>
		            </tbody>
		        </table>
	        </Panel>
        )
    }
}

export default Movie;