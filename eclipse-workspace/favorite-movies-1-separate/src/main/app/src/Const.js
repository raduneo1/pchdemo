//REST API
export const REST_API_URL = 'http://localhost:8080'
export const REST_MOVIES_RES = REST_API_URL + '/api/movies/';
export const GET_REST_MY_MOVIES_URL = REST_MOVIES_RES;
export const POST_REST_MY_MOVIES_URL = REST_MOVIES_RES;
export const SEARCH_REST_MOVIES_BY_MOVIEID_URL = REST_MOVIES_RES + 'search/findByMovieId?movieId=';
export const SEARCH_REST_MOVIES_BY_REVIEW_NOT_EMPTY_URL = REST_MOVIES_RES + 'search/findByReviewNotEmptySortRevChrono';

// TMDB
export const TMDB_API_KEY = '7f705cf4bbb5ffb5e56e76e86c09947f';
export const TMDB_IMG_SIZE_SMALL = 'w92';
export const TMDB_IMG_SIZE_MED = 'w154';
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_CONFIG_URL = TMDB_BASE_URL + '/configuration?api_key=' + TMDB_API_KEY;
export const GET_TMDB_MOVIE_URL_1 = TMDB_BASE_URL + '/movie/';
export const GET_TMDB_MOVIE_URL_2 = '?api_key=' + TMDB_API_KEY + '&append_to_response=credits';
export const SEARCH_TMDB_MOVIES_BY_TITLE_URL = TMDB_BASE_URL + '/search/movie?api_key=' + TMDB_API_KEY + '&query=';

// WEB SOCKET
export const WEBSOCKET_URL = REST_API_URL + '/reviewSocket/';
export const WEBSOCKET_TOPICS =['/topic/newReview', '/topic/changeReview'];