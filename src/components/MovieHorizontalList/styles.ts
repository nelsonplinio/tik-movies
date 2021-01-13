import { Animated, Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper'

const bottomSpace = getBottomSpace();
const statusbarHeight = getStatusBarHeight();

const { width,height } = Dimensions.get('screen');
const moviesPosterWidth = width * 0.65;
const moviePosterHeight =  moviesPosterWidth * (16/9);

export const Container = styled.View`
  flex: 1;
  background: #010101;
  padding: ${statusbarHeight + 16}px 0 ${bottomSpace}px 0;
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
