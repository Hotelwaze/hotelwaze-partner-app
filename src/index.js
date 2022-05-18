import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './navigations';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faAt, faLock, faEye, faEyeSlash} from '@fortawesome/pro-regular-svg-icons';

library.add(faAt, faLock, faEye, faEyeSlash);

const App = () => (
  <NavigationContainer>
    <RootNavigator></RootNavigator>
  </NavigationContainer>
);

export default App;
