import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../scenes/login';

const Stack = createNativeStackNavigator();

const RootNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default RootNavigator;
