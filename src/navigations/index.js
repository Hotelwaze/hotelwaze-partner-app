import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../scenes/login';
import { AuthContext } from '../context/auth-manager';
import AppNavigator from './app-navigator';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const authContext = useContext(AuthContext);

  if (!authContext.restored) {
    return <Text>Loading Screen</Text>;
  }

  return (
    <Stack.Navigator>
      {!authContext?.authState?.authenticated ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen
          name="AppStack"
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
