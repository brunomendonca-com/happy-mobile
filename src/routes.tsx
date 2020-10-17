import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FosterhomesMap from './screens/FosterhomesMap';
import FosterhomeDetails from './screens/FosterhomeDetails';

const { Navigator, Screen } = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="FosterhomesMap" component={FosterhomesMap} />
        <Screen name="FosterhomeDetails" component={FosterhomeDetails} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
