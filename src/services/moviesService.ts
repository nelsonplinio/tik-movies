import data from '../dataset/data';
import Movie from '../models/Movie';

console.log(data.movies);
const getMoviesFrom: (data: {genre: string, limit: number}) => Movie[] = 
  ({genre, limit = 20}) => 
    data.movies
      .filter(movie => (movie.genres || []).includes(genre))
      .slice(0, limit)
      .map(movie => ({
        ...movie,
        release_date: new Date(movie.release_date)
      }));

export { getMoviesFrom };