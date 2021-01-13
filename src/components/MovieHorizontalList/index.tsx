import React, { useRef } from 'react';
import { StyleSheet, Animated, Dimensions } from 'react-native';
import Movie from '../../models/Movie';
import { 
  BackgroundMoviePoster,
  Container,
  MovieContainer,
  MoviePoster,
  MovieDetailContainer,
  MovieTitle,
  MovieReleaseYear,
  MovieOverview,
} from './styles';

const {width: screenWidth} = Dimensions.get('screen');

interface Porps {
  movies: Movie[];
  prefixItemKey: string;
}
const MovieHorizontalList: React.FC<Porps> = ({ movies, prefixItemKey }) => {
  const scrollXMoviesList = useRef(new Animated.Value(0)).current;

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
          <MovieContainer>
            <MoviePoster 
              source={{uri: movie.poster }}
              resizeMode="cover"
            />
            <MovieDetailContainer>
              <MovieTitle>{movie.title}</MovieTitle>
              <MovieReleaseYear>{movie.release_date.getFullYear()}</MovieReleaseYear>
              <MovieOverview numberOfLines={3}>
                {movie.overview} 
              </MovieOverview>
            </MovieDetailContainer>
          </MovieContainer>
        )}
      />
    </Container>
  )
};


export { MovieHorizontalList };