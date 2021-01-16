import { useBackButton, useNavigation, useRoute } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import React, { useMemo } from 'react';
import { StyleSheet, Animated } from 'react-native';
import Movie from '../../models/Movie';
import { 
  Container,
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

  return (
    <>
      <PosterBackground
        source={{ uri: movie.poster }}
        style={[
          StyleSheet.absoluteFillObject
        ]}
        blurRadius={30}
      />

      <BackButton onPress={navigation.goBack}>
        <BackButtonIcon name="arrow-back-outline" size={32} color="white"/>
      </BackButton>

      <Animated.ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
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
    </>
  )
};


export { Detail };