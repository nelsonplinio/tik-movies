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
  padding: ${statusbarHeight}px 0 ${bottomSpace}px 0;
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
`;
