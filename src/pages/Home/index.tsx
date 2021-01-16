import React, { useMemo, useRef, useState } from 'react';
import { FlatList, StatusBar, Animated, Dimensions, View } from 'react-native';
import api from '../../services/api';
import {
  Container,
  GenreContainer,
  GenreTitle,
  GENRE_TITLE_HEIGHT,
  GenreTitleContainer
} from './styles';
import { GenreMovieList } from '../../components/GenreMovieList';
import data from '../../dataset/data';

const {height: screenHeight} = Dimensions.get('window');

const Home: React.FC = () => {
  const genres= useMemo(() => data.genres, []);
  const genreTitleAnimate = useRef(new Animated.Value(0)).current;

  return (
    <Container>
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <Animated.FlatList 
        data={genres}
        keyExtractor={genre => genre}
        pagingEnabled
        initialNumToRender={1}
        renderItem={({ item: genre }) => (
          <GenreMovieList genre={genre} />
        )}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: genreTitleAnimate,
              }
            }
          }
        ],
        {
          useNativeDriver: true,
        })}
      />

      <GenreContainer
       intensity={90}
       tint="dark"
      >
        {genres.map((genre) => {
          const inputRange = [
            -screenHeight,
             0,
            screenHeight,
          ]

          const translateY = genreTitleAnimate.interpolate({
            inputRange,
            outputRange: [
              GENRE_TITLE_HEIGHT,
              0,
              -GENRE_TITLE_HEIGHT
            ]
          })
           
          return (
            <GenreTitleContainer 
              key={genre}
              style={{ transform: [ {translateY} ]}}
            >
              <GenreTitle>{genre}</GenreTitle>
            </GenreTitleContainer>
            
          );
        })}
      </GenreContainer>
    </Container>
  )
};


export { Home };