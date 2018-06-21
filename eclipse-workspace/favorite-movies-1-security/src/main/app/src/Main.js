import React, { Component } from 'react';
import { Router, Route, Switch, withRouter } from 'react-router-dom'
import SockJsClient from 'react-stomp';
import {Growl} from 'primereact/components/growl/Growl';
import Reviews from './Reviews'
import Movie from './Movie'
import MyMovies from './MyMovies'
import Search from './Search'
import { getReqREST } from "./Utils"
import { SEARCH_REST_MOVIES_BY_REVIEW_NOT_EMPTY_URL,
		 WEBSOCKET_URL,
		 WEBSOCKET_TOPICS,
	     TMDB_CONFIG_URL
	   } from './Const'

class Main extends Component {
	constructor(props) {
		super(props);
		
        this.state = {
            reviews: [],
            imgBaseUrl: '',
            error: {}
        };
        
        this.getReviews = this.getReviews.bind(this);
        this.getTMDBImageConfig = this.getTMDBImageConfig.bind(this);
        this.handleSocketMessage = this.handleSocketMessage.bind(this);
		
	}
	
	componentDidMount() {
		this.getReviews();
		this.getTMDBImageConfig();
		setTimeout(()=> console.log(this.state.imgBaseUrl), 5000);
	}
    
    getTMDBImageConfig() {
    	fetch(TMDB_CONFIG_URL)
    	.then(response => response.json())
    	.then(data => {
        	console.log("GETTING TMDB CONFIG");
            this.setState({ imgBaseUrl: data.images.base_url});
        })
        .catch(error => console.log(error));
    }
    
    getReviews() {
        getReqREST(SEARCH_REST_MOVIES_BY_REVIEW_NOT_EMPTY_URL)
        .then(response => response.json())
        .then(data => {
        	console.log("GETTING REVIEWS");
        	const movies = [];
            data._embedded.movies.forEach(movie => {
                movies.push({
                	title: movie.title, 
                	review: movie.review,
                	year: movie.year, 
                	rating: movie.rating, 
                	movieId: movie.movieId,
                	modifiedTime: movie.modifiedTime,
                	posterPath: movie.posterPath
                });
            });
            this.setState({ reviews: movies});
        })
        .catch(error => console.log(error));
    }
    
    handleSocketMessage(msg) {
    	console.log(msg);

    	// Update current review entries
    	this.getReviews();
        // Show growl message
        this.growl.show(
        	{ severity: 'success', 
        	  summary: 'New review!', 
        	  detail: msg.message 
        	});
    }
    
    render() {
        return (
		  <main>
		  <div className="ui-g">
		    <div className="ui-g-12 ui-md-8 ui-lg-6">
			    <Switch>
			      <Route exact path='/' render={()=><Reviews reviews={this.state.reviews} imgBaseUrl={this.state.imgBaseUrl}/>}/>
			      <Route path='/search' render={()=><Search imgBaseUrl={this.state.imgBaseUrl}/>}/>
			      <Route path='/movies' render={()=><MyMovies imgBaseUrl={this.state.imgBaseUrl}/>}/>
			    </Switch>
		     </div>
		   </div>
		   
		   <Growl ref={(el) => { this.growl = el; }}></Growl>
		   
           <SockJsClient 
              url = { WEBSOCKET_URL }
              topics={ WEBSOCKET_TOPICS } 
              onConnect={console.log("Connection established!")} 
              onDisconnect={console.log("Disconnected!")}
              onMessage={(msg) => this.handleSocketMessage(msg)}
              debug= {true}/> 
		  </main>
        )
    }
}

export default Main;