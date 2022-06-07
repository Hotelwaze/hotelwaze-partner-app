import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

const BookingsScreen = () => (
  <Wrapper>
    <Text>Bookings Screen</Text>
  </Wrapper>
);

export default BookingsScreen;
