import { useBackButton, useNavigation, useRoute } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import React, { useMemo, useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';
import Movie from '../../models/Movie';
import {
  BackgroundContainer,
  Container,
  HeaderContainer,
  HeaderContainerBlur,
  BackButton,
  BackButtonIcon,
  PosterBackground,
  Poster,
  SectionContainer,
  SectionTitle,
  DetailsContainer,
  TitleText,
  DescriptionText,
  GenresContainer,
  GenreFlagContainer,
  GenreFlag,
  BackButtonCicleViewAnimated,
  BackButtonCicleBlur
} from './styles';

const Detail: React.FC = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const movie: Movie = useMemo(
    () => JSON.parse((params as any).movie),
    [params]
  );
  const releaseYear = useMemo(
    () => new Date(movie.release_date).getFullYear(),
    [movie.release_date]
  );

  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <BackgroundContainer>
      <PosterBackground
        source={{ uri: movie.poster }}
        style={[
          StyleSheet.absoluteFillObject
        ]}
        blurRadius={30}
      />

      <HeaderContainer
       style={{
          opacity: scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1]
          })
        }}
      >
        <HeaderContainerBlur intensity={90} tint="dark"/>
      </HeaderContainer>
      
      <BackButton onPress={navigation.goBack}>
          <BackButtonCicleViewAnimated 
           style={{
             opacity: scrollY.interpolate({
               inputRange: [0, 100],
               outputRange: [1, 0]
             })
           }}
          >
            <BackButtonCicleBlur intensity={90} tint="dark" />
          </BackButtonCicleViewAnimated>
          <BackButtonIcon name="arrow-back-outline" size={32} color="white"/>
      </BackButton>

      <Animated.ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                }
              }
            }
          ],
          {
            useNativeDriver: true,
          }
        )}
      >
        <Container>
          <SharedElement id={`item.${movie.id}.poster`} style={{ zIndex: 6 }}>
            <Poster 
              source={{ uri: movie.poster }}
              resizeMode="cover"
            />
          </SharedElement>

          <DetailsContainer
           intensity={90}
           tint="dark"
          >
            <TitleText>{ movie.title } • { releaseYear } </TitleText>
            
            <SectionContainer>
              <SectionTitle>Description</SectionTitle>
              <DescriptionText>{ movie.overview }</DescriptionText>
            </SectionContainer>

            <SectionContainer>
              <SectionTitle>Genres</SectionTitle>
                <GenresContainer>
                  {movie.genres.map(genre => (
                    <GenreFlagContainer 
                      key={genre}
                      intensity={40}
                      tint="light"
                    >
                      <GenreFlag>{ genre }</GenreFlag>
                    </GenreFlagContainer>
                  ))}
              </GenresContainer>
            </SectionContainer>
            
          </DetailsContainer>

        </Container>
      
      </Animated.ScrollView>
    </BackgroundContainer>
  )
};


export { Detail };