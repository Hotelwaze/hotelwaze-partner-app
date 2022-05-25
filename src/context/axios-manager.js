import React, { createContext, useContext } from 'react';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import * as Keychain from 'react-native-keychain';
import PropTypes from 'prop-types';
import Config from 'react-native-config';
import jwtDecode from 'jwt-decode';
import { AuthContext } from './auth-manager';

const AxiosContext = createContext();
const { Provider } = AxiosContext;

const AxiosProvider = ({ children }) => {
  const authContext = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL: Config.API_URL,
  });

  const publicAxios = axios.create({
    baseURL: Config.API_URL,
  });

  authAxios.interceptors.request.use(
    config => {
      if (!config.headers.Authorization) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`;
      }

      return config;
    },
    error => Promise.reject(error),
  );

  const refreshAuthLogic = failedRequest => {
    const data = {
      refreshToken: authContext.authState.refreshToken,
    };

    const options = {
      method: 'POST',
      data,
      url: `${Config.API_URL}/auth/refresh-token`,
    };

    return axios(options)
      .then(async tokenRefreshResponse => {
        // eslint-disable-next-line no-param-reassign
        failedRequest.response.config.headers.Authorization = `Bearer ${tokenRefreshResponse.data.accessToken}`;

        console.log(
          'refreshToken',
          jwtDecode(tokenRefreshResponse.data.accessToken, { body: true }),
        );

        await authContext.updateAuthState({
          ...authContext.authState,
          user: jwtDecode(tokenRefreshResponse.data.accessToken, {
            body: true,
          }),
          accessToken: tokenRefreshResponse.data.accessToken,
        });

        await Keychain.setGenericPassword(
          'token',
          JSON.stringify({
            accessToken: tokenRefreshResponse.data.accessToken,
            refreshToken: authContext.authState.refreshToken,
          }),
        );

        return Promise.resolve();
      })
      .catch(async e => {
        console.log(e);
        await authContext.updateAuthState({
          user: null,
          accessToken: null,
          refreshToken: null,
        });
      });
  };

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});

  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
      }}>
      {children}
    </Provider>
  );
};

AxiosProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AxiosContext, AxiosProvider };
