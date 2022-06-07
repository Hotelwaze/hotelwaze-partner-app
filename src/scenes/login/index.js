import React, { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import * as Keychain from 'react-native-keychain';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Linking } from 'react-native';
import { AuthContext } from '../../context/auth-manager';
import { AxiosContext } from '../../context/axios-manager';
import jwtDecode from 'jwt-decode';

const Wrapper = styled.ImageBackground`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const Heading = styled.View`
  padding: 68px 24px 24px;
  margin-bottom: auto;
`;

const Headline = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 20px;
  line-height: 24px;
  color: #ffffff;
  margin-bottom: 4px;
`;

const Subhead = styled.Text`
  font-family: 'Montserrat-Regular';
  font-size: 14px;
  line-height: 18px;
  color: #ffffff;
`;

const BrandLogo = styled.Image`
  width: 100px;
  height: 70px;
  margin-bottom: 24px;
`;

const LoginContainer = styled.View`
  background: #023b6b;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  align-self: stretch;
  padding: 24px 24px 56px;
`;

const LoginTitle = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 24px;
  line-height: 28px;
  color: #ffffff;
  margin-bottom: 24px;
`;

const FormField = styled.View`
  margin-bottom: 12px;
`;

const FormInputGroup = styled.View`
  position: relative;
  width: 100%;
`;

const FormInput = styled.TextInput`
  background: #ffffff;
  height: 48px;
  border-radius: 4px;
  padding-left: 12px;
  padding-right: 12px;
  font-family: 'Montserrat-Regular';
  font-size: 14px;
  line-height: 18px;
  color: #262626;
`;

const FormInputIconLeft = styled(FormInput)`
  padding-left: 48px;
`;

const FormInputIconLeftButtonRight = styled(FormInput)`
  padding-left: 48px;
  padding-right: 68px;
`;

const IconLeft = styled.View`
  position: absolute;
  z-index: 9999;
  top: 14px;
  left: 12px;
`;

const ButtonRight = styled.Pressable`
  position: absolute;
  z-index: 9999;
  top: 2px;
  right: 12px;
`;

const ButtonRightBg = styled.View`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TermsPrivacyMessage = styled.Text`
  font-family: 'Montserrat-Regular';
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: #ffffff;
  width: 100%;
  margin-bottom: 12px;
`;

const Hyperlink = styled.Text`
  text-decoration: ${({ pressed }) => (pressed ? 'none' : 'underline')};
  text-decoration-color: #ffffff;
`;

const LoginButton = styled.Pressable`
  align-self: stretch;
  margin-bottom: 12px;
`;

const LoginButtonBackground = styled.View`
  border: 1px solid #f61a88;
  background-color: ${({ pressed }) => (pressed ? '#dd177a' : '#F61a88')};
  border-radius: 4px;
  padding: 12px;
`;

const LoginButtonLabel = styled.Text`
  font-family: 'Montserrat-SemiBold';
  line-height: 16px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
`;

const ForgotPasswordButton = styled.Pressable`
  align-self: center;
  margin-bottom: 12px;
`;

const ForgotPasswordButtonBackground = styled.View``;

const ForgotPasswordButtonLabel = styled.Text`
  font-family: 'Montserrat-Regular';
  font-size: 14px;
  line-height: 18px;
  text-decoration: ${({ pressed }) => (pressed ? 'none' : 'underline')};
  text-decoration-color: #ffffff;
  color: #ffffff;
`;

const NoAccountMessage = styled.Text`
  font-family: 'Montserrat-Regular';
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: #ffffff;
  width: 100%;
  margin-bottom: 12px;
`;

const LoginScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required('Enter your email.')
      .email('Email must be in a valid format.'),
    password: yup.string().required('Enter your password.'),
  });

  const formOptions = {
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm(formOptions);

  const handleLogin = async data => {
    try {
      setIsSubmitting(true);

      const response = await publicAxios.post('/auth/login', {
        email: data.email,
        password: data.password,
      });

      const { user: userToken, refreshToken } = response.data.data;

      await authContext.updateAuthState({
        user: jwtDecode(userToken, { body: true }),
        accessToken: userToken,
        refreshToken,
        authenticated: true,
      });

      await Keychain.setGenericPassword(
        'token',
        JSON.stringify({
          user: jwtDecode(userToken, { body: true }),
          accessToken: userToken,
          refreshToken,
        }),
      );
      setTimeout(() => {
        navigation.navigate('AppStack');
      }, 1000);
    } catch (error) {
      setIsSubmitting(false);
      invalidLoginAlert(error.response.data.message);
    }
  };

  const showHidePassword = () => {
    setPasswordHidden(!passwordHidden);
  };

  const invalidLoginAlert = message => {
    Alert.alert(message, '', [
      { text: 'Close', onPress: () => console.log('Close alert') },
    ]);
  };

  return (
    <Wrapper
      source={require('../../assets/images/login-bg.jpg')}
      resizeMode="cover">
      <Heading>
        <Headline>Lorem Ipsum</Headline>
        <Subhead>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Subhead>
      </Heading>
      <BrandLogo
        source={require('../../assets/images/hotelwaze-partner-logo.png')}
      />
      <LoginContainer>
        <LoginTitle>Log in</LoginTitle>
        <FormField>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value, onBlur } }) => (
              <FormInputGroup>
                <IconLeft>
                  <FontAwesomeIcon
                    icon={['far', 'at']}
                    size={20}
                    color="#a6a6a6"
                  />
                </IconLeft>
                <FormInputIconLeft
                  editable={!isSubmitting}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={val => onChange(val)}
                  value={value}
                  onBlur={onBlur}
                  blurOnSubmit
                  isValid={isValid}
                  placeholder="Enter your email address"
                />
              </FormInputGroup>
            )}
          />
        </FormField>
        <FormField>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value, onBlur } }) => (
              <FormInputGroup>
                <IconLeft>
                  <FontAwesomeIcon
                    icon={['far', 'lock']}
                    size={20}
                    color="#a6a6a6"
                  />
                </IconLeft>
                <FormInputIconLeftButtonRight
                  editable={!isSubmitting}
                  secureTextEntry={passwordHidden}
                  placeholder="Enter your password"
                  onChangeText={val => onChange(val)}
                  value={value}
                  onBlur={onBlur}
                  blurOnSubmit
                />
                <ButtonRight onPress={() => showHidePassword()}>
                  <ButtonRightBg>
                    <FontAwesomeIcon
                      icon={['far', `${passwordHidden ? 'eye-slash' : 'eye'}`]}
                      size={20}
                      color="#595959"
                    />
                  </ButtonRightBg>
                </ButtonRight>
              </FormInputGroup>
            )}
          />
        </FormField>
        <TermsPrivacyMessage>
          By logging in, you agree to Hotelwaze&apos;s{' '}
          <Hyperlink
            onPress={() => {
              Linking.openURL('https://hotelwaze.com/terms').then(r => {});
            }}>
            terms
          </Hyperlink>{' '}
          and{' '}
          <Hyperlink
            onPress={() => {
              Linking.openURL('https://hotelwaze.com/privacy').then(r => {});
            }}>
            privacy policy
          </Hyperlink>
          .
        </TermsPrivacyMessage>
        <LoginButton
          onPress={handleSubmit(handleLogin)}
          disabled={isSubmitting}>
          {({ pressed }) => (
            <LoginButtonBackground pressed={pressed}>
              <LoginButtonLabel>
                {isSubmitting ? 'Logging in...' : 'Log in'}
              </LoginButtonLabel>
            </LoginButtonBackground>
          )}
        </LoginButton>
        <ForgotPasswordButton
          onPress={() => navigation.navigate('ForgotPassword')}>
          {({ pressed }) => (
            <ForgotPasswordButtonBackground pressed={pressed}>
              <ForgotPasswordButtonLabel pressed={pressed}>
                Forgot password?
              </ForgotPasswordButtonLabel>
            </ForgotPasswordButtonBackground>
          )}
        </ForgotPasswordButton>
        <NoAccountMessage>
          No account yet? Register at{' '}
          <Hyperlink
            onPress={() => {
              Linking.openURL('https://hotelwaze.com/partners').then(r => {});
            }}>
            hotelwaze.com/partners
          </Hyperlink>
        </NoAccountMessage>
      </LoginContainer>
    </Wrapper>
  );
};

export default LoginScreen;
