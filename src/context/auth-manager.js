import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import * as Keychain from 'react-native-keychain';
import { usePersistStorage } from 'react-native-use-persist-storage';

const AuthContext = createContext(null);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState, restored] = usePersistStorage('@AuthState', {
    user: null,
    accessToken: null,
    refreshToken: null,
    authenticated: false,
  });

  const logout = async () => {
    await Keychain.resetGenericPassword();
    await setAuthState({
      user: null,
      accessToken: null,
      refreshToken: null,
      authenticated: false,
    });
  };

  const getAccessToken = () => authState.accessToken;

  return (
    <Provider
      value={{
        authState,
        updateAuthState: setAuthState,
        restored,
        getAccessToken,
        logout,
      }}>
      {children}
    </Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object]),
};

AuthProvider.defaultProps = {
  children: null,
};

export { AuthContext, AuthProvider };
