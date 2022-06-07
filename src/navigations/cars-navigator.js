import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CarsScreen from '../scenes/cars';
import CarScreen from '../scenes/car';

const Stack = createNativeStackNavigator();

const CarsNavigator = () => (
  <Stack.Navigator>
    <Stack.Group>
      <Stack.Screen
        name="Cars"
        component={CarsScreen}
        options={{
          title: 'My Cars',
          tabBarLabel: 'Cars',
          headerTitleStyle: {
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 18,
            lineHeight: 22,
            color: '#262626',
          },
        }}
      />
    </Stack.Group>
    <Stack.Group>
      <Stack.Screen name="Car" component={CarScreen} />
    </Stack.Group>
  </Stack.Navigator>
);

export default CarsNavigator;
