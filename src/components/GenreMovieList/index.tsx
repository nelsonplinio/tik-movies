import React, { useEffect, useState } from 'react';
import Movie from '../../models/Movie';
import api from '../../services/api';
import { MovieHorizontalList } from '../MovieHorizontalList';
import { Container, Title } from './styles';

interface Props {
  genre: string;
}
const GenreMovieList: React.FC<Props> = ({ genre }) => {
  const [movies, setMovies] = useState([]);

  // load movies
  useEffect(() => {
    const loadMovies = async () => {
      const { data } = await api.get<Movie[]>(`/movies?_page=1&_limit=20&genres=${genre}`);

      setMovies(data.map(movie => ({
        ...movie,
        release_date: new Date(movie.release_date),
      })));
    };

    loadMovies();
  }, [genre]);

  return (
    <Container>
      <MovieHorizontalList 
        movies={movies}
        prefixItemKey={genre}
      />
      <Title>{genre}</Title>
    </Container>
  )
};


export {GenreMovieList};