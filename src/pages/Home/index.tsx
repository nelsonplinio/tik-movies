import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, Animated, Dimensions } from 'react-native';
import api from '../../services/api';
import Movie from '../models/movies';
import { BackgroundMoviePoster, Container, MovieContainer, MoviePoster } from './styles';

const {width: screenWidth} = Dimensions.get('screen');

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const scrollXMoviesList = useRef(new Animated.Value(0)).current;

  // load movies
  useEffect(() => {
    const loadMovies = async () => {
      const { data } = await api.get<Movie[]>('/movies?_page=1&_limit=20');
      setMovies(data);
    };

    loadMovies();
  }, []);


  return (
    <Container>
      <StatusBar translucent barStyle="light-content" />
      {movies.map((movie, index) => {
        const inputRange = [
          (index - 1) * screenWidth,
          index * screenWidth,
          (index + 1) * screenWidth
        ];

        const backgroundPosterOpacity = scrollXMoviesList.interpolate({
          inputRange,
          outputRange: [0, 1, 0]
        });

        return (
          <BackgroundMoviePoster 
            key={`image.${movie.id}.${index}`}
            source={{ uri: movie.poster }}
            style={[
              StyleSheet.absoluteFillObject,
              { 
                opacity: backgroundPosterOpacity
              }
            ]}
            blurRadius={30}
          />
        )
      })}
      
      <Animated.FlatList
        data={movies}
        pagingEnabled
        horizontal
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollXMoviesList,
                }
              }
            }
          ],
          {
            useNativeDriver: true,
          }
        )}
        showsHorizontalScrollIndicator={false}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <MovieContainer>
            <MoviePoster 
              source={{uri: item.poster }}
              resizeMode="cover"
            />
          </MovieContainer>
        )}
      />
    </Container>
  )
};


export { Home };