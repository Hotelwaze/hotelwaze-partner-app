import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../scenes/login';
import {AuthContext} from '../context/auth-manager';
import AppNavigator from './app-navigator';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const authContext = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {authContext?.authState?.authenticated === true ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen
          name="App"
          component={AppNavigator}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
