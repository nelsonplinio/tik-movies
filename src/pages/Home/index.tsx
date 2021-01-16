import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StatusBar, Animated, Dimensions } from 'react-native';
import api from '../../services/api';
import {
  Container,
  GenreContainer,
  GenreTitle,
  GENRE_TITLE_HEIGHT,
  GenreTitleContainer
} from './styles';
import { GenreMovieList } from '../../components/GenreMovieList';

const {height: screenHeight} = Dimensions.get('screen');

const Home: React.FC = () => {
  const [genres, setGenres] = useState<string[]>([]);
  const genreTitleAnimate = useRef(new Animated.Value(0)).current;
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