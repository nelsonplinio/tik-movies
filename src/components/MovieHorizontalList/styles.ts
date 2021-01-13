import { Animated, Dimensions, Platform } from 'react-native';
import styled from 'styled-components/native';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper'

const {bottomSpace, statusbarHeight} = Platform.select({
  android: {bottomSpace: 0, statusbarHeight: 0},
  ios: {bottomSpace: getBottomSpace(), statusbarHeight: getStatusBarHeight()}
});

const { width,height } = Dimensions.get('window');
const moviesPosterWidth = width * 0.65;
const moviePosterHeight =  moviesPosterWidth * (16/9);

export const Container = styled.View`
  height: ${height}px;
  background: #010101;
  padding: ${statusbarHeight}px 0 0 0;
`;

export const BackgroundMoviePoster = styled(Animated.Image)`
  
`;

export const MovieContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: ${height}px;
  width: ${width}px;
`;

export const MoviePoster = styled.Image`
  height: ${moviePosterHeight}px;
  width: ${moviesPosterWidth}px;
  border-radius: 8px;
  margin-bottom: ${bottomSpace + 22}px;
`;

export const MovieDetailContainer = styled.View`
  padding: 22px;
  padding-bottom: ${bottomSpace + 16}px;
  background: rgba(0,0,0,0.6);
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export const MovieTitle = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #f1f1f1;
  margin-bottom: 4px;
`;

export const MovieReleaseYear = styled.Text`
  font-size: 16px;
  color: #f1f1f1;
  margin-bottom: 8px;
`;

export const MovieOverview = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #f1f1f1;
  margin-bottom: 8px;
`;
