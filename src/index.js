import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigations';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAt as farAt,
  faLock as farLock,
  faEye as farEye,
  faEyeSlash as FarEyeSlash,
} from '@fortawesome/pro-regular-svg-icons';
import {
  faCars as fasCars,
  faCalendarLinesPen as fasCalendarLinesPen,
  faGauge as fasGauge,
  faPeopleGroup as fasPeopleGroup,
  faImageSlash as fasImageSlash,
} from '@fortawesome/pro-solid-svg-icons';

import { AuthProvider } from './context/auth-manager';
import { AxiosProvider } from './context/axios-manager';

library.add(
  farAt,
  farLock,
  farEye,
  FarEyeSlash,
  fasCars,
  fasCalendarLinesPen,
  fasGauge,
  fasPeopleGroup,
  fasImageSlash,
);

const App = () => (
  <AuthProvider>
    <AxiosProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AxiosProvider>
  </AuthProvider>
);

export default App;
