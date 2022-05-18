import React, {createContext, useState} from 'react';
import PropTypes from 'prop-types';
import * as Keychain from 'react-native-keychain';

const AuthContext = createContext(null);
const {Provider} = AuthContext;

const AuthProvider = ({children}) => {
  const [authState, setAuthState] = useState({
    user: null,
    accessToken: null,
    refreshToken: null,
    authenticated: false,
  });

  const logout = async () => {
    await Keychain.resetGenericPassword();
    setAuthState({
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
        getAccessToken,
        setAuthState,
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

export {AuthContext, AuthProvider};
