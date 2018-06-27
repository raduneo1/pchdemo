export function postReqREST(url, data, method) {
  // Default options are marked with *
	//debugger;
  return fetch(url, {
	headers: { "Content-type": "application/json" },
	credentials: 'include',
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
  })

}

export function getReqREST(url) {
    return fetch(url, {
      credentials: 'include',
      method: 'GET',
      mode: 'cors'
    });
}

export function getRatingDescription(rating) {
	let description = " ";
	if (rating === 10) {
		description = "Perfect"
	} else if (rating >= 8 && rating <= 9) {
		description = "Excellent"	
    } else if (rating === 7) {
		description = "Fair"	        	
    } else if (rating >= 5 && rating <= 6) {
		description = "Average"	        	
    } else if (rating >= 1 && rating <= 4) {
		description = "Poor"	          	
    } else {
    	description = "unrated"
    }
	return description;
}