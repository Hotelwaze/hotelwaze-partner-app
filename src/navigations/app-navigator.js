import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CarsScreen from '../scenes/cars';
const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Cars"
      component={CarsScreen}
      options={{
        title: 'My Cars',
        headerTitleStyle: {
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 18,
          lineHeight: 22,
          color: '#262626',
        },
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
