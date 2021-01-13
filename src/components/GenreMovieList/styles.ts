import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const statusbarHeight = getStatusBarHeight();

export const Container = styled.View`
  background: #010101;
`;

export const Title = styled.Text`
  position: absolute;
  font-size: 42px;
  font-weight: bold;
  color: #f1f1f1;
  background: rgba(0,0,0,0.6);
  width: 100%;
  padding: ${statusbarHeight + 16}px 16px 16px 16px;
`;
