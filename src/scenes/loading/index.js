import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
`;

const LoadingScreen = () => (
  <Wrapper>
    <Text>Drivers Screen</Text>
  </Wrapper>
);

export default LoadingScreen;
