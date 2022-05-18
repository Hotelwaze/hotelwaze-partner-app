import React from 'react';
import styled from 'styled-components/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Linking} from 'react-native';

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
  text-decoration: underline;
  margin-bottom: 12px;
`;

const Hyperlink = styled.Text`
  text-decoration: ${({pressed}) => (pressed ? 'none' : 'underline')};
`;

const LoginButton = styled.Pressable`
  align-self: stretch;
  margin-bottom: 12px;
`;

const LoginButtonBackground = styled.View`
  border: 1px solid #f61a88;
  background-color: ${({pressed}) => (pressed ? '#dd177a' : '#F61a88')};
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
`;

const ForgotPasswordButtonBackground = styled.View``;

const ForgotPasswordButtonLabel = styled.Text`
  font-family: 'Montserrat-Regular';
  font-size: 14px;
  line-height: 18px;
  text-decoration: ${({pressed}) => (pressed ? 'none' : 'underline')};
  color: #ffffff;
`;

const LoginScreen = ({navigation}) => (
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
        <FormInputGroup>
          <IconLeft>
            <FontAwesomeIcon icon={['far', 'at']} size={20} color="#a6a6a6" />
          </IconLeft>
          <FormInputIconLeft
            editable
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Enter your email address"
          />
        </FormInputGroup>
      </FormField>
      <FormField>
        <FormInputGroup>
          <IconLeft>
            <FontAwesomeIcon icon={['far', 'lock']} size={20} color="#a6a6a6" />
          </IconLeft>
          <FormInputIconLeftButtonRight
            editable
            secureTextEntry={true}
            placeholder="Enter your password"
          />
          <ButtonRight>
            <ButtonRightBg>
              <FontAwesomeIcon
                icon={['far', 'eye-slash']}
                size={20}
                color="#595959"
              />
            </ButtonRightBg>
          </ButtonRight>
        </FormInputGroup>
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
      <LoginButton onPress={() => console.warn('Log in')}>
        {({pressed}) => (
          <LoginButtonBackground pressed={pressed}>
            <LoginButtonLabel>Log in</LoginButtonLabel>
          </LoginButtonBackground>
        )}
      </LoginButton>
      <ForgotPasswordButton
        onPress={() => navigation.navigate('ForgotPassword')}>
        {({pressed}) => (
          <ForgotPasswordButtonBackground pressed={pressed}>
            <ForgotPasswordButtonLabel pressed={pressed}>
              Forgot password?
            </ForgotPasswordButtonLabel>
          </ForgotPasswordButtonBackground>
        )}
      </ForgotPasswordButton>
    </LoginContainer>
  </Wrapper>
);

export default LoginScreen;
