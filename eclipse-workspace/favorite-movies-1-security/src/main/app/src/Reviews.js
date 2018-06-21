import React, { Component } from 'react';
import {Card} from 'primereact/components/card/Card';
import {Rating} from 'primereact/components/rating/Rating';
import {TMDB_IMG_SIZE_SMALL} from './Const'

class Reviews extends Component {
    render() {
    	// !!!!!!   !!   !!!!!!   !!   !!!!!!   !!   !!!!!!   !!   !!!!!!   !!   !!!!!!   !!
    	// !!! NOTE THAT REVIEW STATE IS KEPT IN MAIN.JS FOR PROPER SYNC WITH WEBSOCKET   !!
    	// !!!!!!   !!   !!!!!!   !!   !!!!!!   !!   !!!!!!   !!   !!!!!!   !!   !!!!!!   !!
    	const header = function(time) {
    		return <div>
    		            <span className="ui-inputgroup-addon" style={{float: 'right'}}><i className="fa fa-clock-o"></i> By 'User' on: {time}</span>
    		            <br />
    		       </div>
    	}
    	
        return (
            <div>
               <h3>Latest reviews</h3>
               
               <ul>
               {this.props.reviews.map(review => {
               	   const imageUrl = this.props.imgBaseUrl + TMDB_IMG_SIZE_SMALL + review.posterPath;
            	   return (
            	     <li className="review" key={review.movieId}>
            	       <Card title={review.title + " (" + review.year + ")"} 
            	             style={{width: '600px'}} className="ui-card-shadow"
            	             header={header(review.modifiedTime)}>
                         <div>
                           <table>
                             <tbody>
                               <tr>
                                 <td>
                                     <img src={imageUrl} alt="Movie" />
                                 </td>
                                 
                                 <td>
                                     <Rating value={review.rating * 0.5} stars={5} readonly={true} />
                                     {review.review}
                                 </td>
                               </tr>
                             </tbody>
                           </table>

                         </div> 
                       </Card>
                       <br />
                     </li>)
               })}
               </ul>

            </div>
        )
    }
}

export default Reviews;