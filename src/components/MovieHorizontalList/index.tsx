import React, { useCallback, useRef } from 'react';
import { StyleSheet, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Movie from '../../models/Movie';
import { 
  BackgroundMoviePoster,
  Container,
  MovieContainer,
  MoviePoster,
  MovieDetailContainer,
  MovieDetailBlurContainer,
  MovieTitle,
  MovieReleaseYear,
  MovieOverview,
  MovieContainerTouchable,
} from './styles';
import { SharedElement } from 'react-navigation-shared-element';

const {width: screenWidth} = Dimensions.get('screen');

interface Porps {
  genre: string;
  movies: Movie[];
  prefixItemKey: string;
}
const MovieHorizontalList: React.FC<Porps> = ({ genre, movies, prefixItemKey }) => {
  const navigation = useNavigation();
  const scrollXMoviesList = useRef(new Animated.Value(0)).current;
  const movieCardOnPress = useCallback((movie: Movie) => {  
    navigation.navigate('Detail', { 
      genre,
      movieId: movie.id,
      movie: JSON.stringify(movie)
    })
  }, []);

  return (
    <Container>
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
            key={`${prefixItemKey}.image.${movie.id}.${index}`}
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
        renderItem={({ item: movie }) => (
          <MovieContainerTouchable
            onPress={() => { movieCardOnPress(movie) }}
          >
            <MovieContainer>
              <SharedElement id={`item.${genre}.${movie.id}.poster`} style={{ zIndex: 6 }}>
                <MoviePoster 
                  source={{uri: movie.poster }}
                  resizeMode="cover"
                />
              </SharedElement>
              <MovieDetailContainer>
                <MovieDetailBlurContainer 
                  intensity={90}
                  tint="dark"
                >
                  <MovieTitle>{movie.title}</MovieTitle>
                  <MovieReleaseYear>{movie.release_date.getFullYear()}</MovieReleaseYear>
                  <MovieOverview numberOfLines={3}>
                    {movie.overview} 
                  </MovieOverview>
                </MovieDetailBlurContainer>
              </MovieDetailContainer>
            </MovieContainer>
          </MovieContainerTouchable>
        )}
      />
    </Container>
  )
};


export { MovieHorizontalList };