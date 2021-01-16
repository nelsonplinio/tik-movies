import React, { useEffect, useMemo, useState } from 'react';
import Movie from '../../models/Movie';
import api from '../../services/api';
import { getMoviesFrom } from '../../services/moviesService';
import { MovieHorizontalList } from '../MovieHorizontalList';
import { Container, Title } from './styles';

interface Props {
  genre: string;
}
const GenreMovieList: React.FC<Props> = ({ genre }) => {
  const movies = useMemo(() => getMoviesFrom({ genre, limit: 20 }), [genre])

  return (
    <Container>
      <MovieHorizontalList
        genre={genre}
        movies={movies}
        prefixItemKey={genre}
      />
    </Container>
  )
};


export {GenreMovieList};