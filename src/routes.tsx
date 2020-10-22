import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FosterHomesMap from './screens/FosterHomesMap';
import FosterHomeDetails from './screens/FosterHomeDetails';

import SelectMapPosition from './screens/CreateFosterHome/SelectMapPosition';
import FosterHomeData from './screens/CreateFosterHome/FosterHomeData';
import Header from './components/header';

const { Navigator, Screen } = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#f2f3f5' },
        }}
      >
        <Screen name="FosterHomesMap" component={FosterHomesMap} />
        <Screen
          name="FosterHomeDetails"
          component={FosterHomeDetails}
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title="Foster Home" />,
          }}
        />

        <Screen
          name="SelectMapPosition"
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title="Select foster home position" />,
          }}
        />
        <Screen
          name="FosterHomeData"
          component={FosterHomeData}
          options={{
            headerShown: true,
            header: () => <Header title="Add foster home details" />,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
