import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { BlurView } from 'expo-blur';

const statusbarHeight = getStatusBarHeight();

export const GENRE_TITLE_HEIGHT = 42 + (16*2) + statusbarHeight;

export const Container = styled.View`
  flex: 1;
  background: #010101;

`;

export const GenreContainer = styled(BlurView)`
  position: absolute;
  background: rgba(0,0,0,0.6);
  width: 100%;
  overflow: hidden;
  height: ${42 + statusbarHeight + 16 * 3}px;
`;

export const GenreTitleContainer = styled(Animated.View)`
  height: ${GENRE_TITLE_HEIGHT}px;
  justify-content: center;
`;

export const GenreTitle = styled(Animated.Text)`
  font-size: 42px;
  font-weight: bold;
  color: #f1f1f1;
  margin-top: ${statusbarHeight + 16}px;
  margin-left: 16px;
  margin-right: 16px;
`;

