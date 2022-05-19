import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

const DashboardScreen = () => (
  <Wrapper>
    <Text>Dashboard Screen</Text>
  </Wrapper>
);

export default DashboardScreen;
