import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, Animated, Dimensions } from 'react-native';
import api from '../../services/api';
import Movie from '../../models/Movie';
import { MovieHorizontalList } from '../../components/MovieHorizontalList';
import { BackgroundMoviePoster, Container, MovieContainer, MoviePoster } from './styles';
import { GenreMovieList } from '../../components/GenreMovieList';


const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<string[]>([]);

  // load genres
  useEffect(() => {
    const loadGenres = async () => {
      const { data: genres } = await api.get<string[]>('/genres');
      setGenres(genres);
    };

    loadGenres();
  }, []);


  return (
    <Container>
      <StatusBar translucent barStyle="light-content" backgroundColor="rgba(0,0,0,0.2)" />
      <FlatList 
        data={genres}
        keyExtractor={genre => genre}
        pagingEnabled
        initialNumToRender={1}
        renderItem={({ item: genre }) => (
          <GenreMovieList genre={genre} />
        )}
        />
    </Container>
  )
};


export { Home };