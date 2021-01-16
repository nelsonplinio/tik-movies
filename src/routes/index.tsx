import React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { Home } from '../pages/Home';
import { Detail } from '../pages/Detail';
import { TransitionPresets } from '@react-navigation/stack';

enableScreens();

const Stack = createSharedElementStackNavigator();

export const iosTransitionSpec = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 10,
    restSpeedThreshold: 10,
  },
};

const MainRoutes: React.FC = () => {
  return (
    <Stack.Navigator headerMode="none" 
      mode="modal"
      screenOptions={{
        useNativeDriver: true,
        gestureEnabled: false,
        ...TransitionPresets.ModalSlideFromBottomIOS,
        transitionSpec: {
          open: iosTransitionSpec,
          close: iosTransitionSpec,
        } as any,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress,
          },
        }),
      } as any}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Detail"
        component={Detail}
        sharedElementsConfig={(route, otherRoute, showing) => {
          const { movieId } = route.params;
          
          return [
            {
              id: `item.${movieId}.poster`,
              animation: 'move',
              resize: 'auto',
            }
          ];
        }}
      />
    </Stack.Navigator>
  );
};


const AppRoutes: React.FC = () => {
  return (
    <NavigationContainer>
      <MainRoutes />
    </NavigationContainer>
  );
};

export { AppRoutes };