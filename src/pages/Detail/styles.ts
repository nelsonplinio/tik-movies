import { Animated, Dimensions, Platform } from 'react-native';
import styled from 'styled-components/native';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper'
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
const {bottomSpace, statusbarHeight} = Platform.select({
  android: {bottomSpace: 0, statusbarHeight: getStatusBarHeight()},
  ios: {bottomSpace: getBottomSpace(), statusbarHeight: getStatusBarHeight()}
});

const { width } = Dimensions.get('window');
const moviesPosterWidth = width * 0.45;
const moviePosterHeight =  moviesPosterWidth * (16/9);

export const BackgroundContainer = styled.View`
  flex: 1;
  background: #010101;
`;

export const Container = styled.View`
  align-items: center;
  justify-content: flex-start;
  padding: ${statusbarHeight + 32}px 16px;
`;

export const HeaderContainer = styled(Animated.View)`
  position: absolute;
  padding-top: ${statusbarHeight + 16}px;
  width: 100%;
  height: ${statusbarHeight + 42 + 16*2}px;
  z-index: 8;
`;

export const HeaderContainerBlur = styled(BlurView)`
  position: absolute;
  width: 100%;
  bottom: 0;
  top: 0;
`;

export const BackButton = styled.TouchableOpacity`
  position: relative;
  left: 16px;
  height: 46px;
  width: 46px;
  z-index: 10px;
  top: ${statusbarHeight + 16}px;
`;

export const BackButtonCicleViewAnimated = styled(Animated.View)``;

export const BackButtonCicleBlur = styled(BlurView)`
  align-items: center;
  justify-content: center;
  height: 46px;
  width: 46px;
  overflow: hidden;
  border-radius: 23px;
`;

export const BackButtonIcon = styled(Ionicons)`
  position: absolute;
  top: 6px;
  left: 8px;
`;

export const PosterBackground = styled.Image`
  flex: 1;
`;

export const Poster = styled.Image`
  height: ${moviePosterHeight}px;
  width: ${moviesPosterWidth}px;
  border-radius: 16px;
  margin-bottom: -26px;
  z-index: 5;
`;

export const DetailsContainer = styled(BlurView)`
  flex: 1;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  padding: 32px 16px;
  width: 100%;
`;

export const SectionContainer = styled.View`
  margin-bottom: 22px;
`;

export const SectionTitle = styled.Text`
  font-weight: bold;
  color: #fff;
  margin-bottom: 8px;
  font-size: 18px;
`;

export const TitleText = styled.Text`
  font-size: 28px;
  color: #fff;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const DescriptionText = styled.Text`
  font-size: 20px;
  color: #fff;
  line-height: 32;
`;

export const GenresContainer = styled.View`
  flex-direction: row;
  overflow: hidden;
  flex-wrap: wrap;
`;

export const GenreFlagContainer = styled(BlurView)`
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 16px;
  margin-top: 8px;
  width: 100px;
  position: relative;
`;

export const GenreFlag = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;
