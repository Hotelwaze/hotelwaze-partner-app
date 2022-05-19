import React from 'react';
import styled from 'styled-components/native';
import LogoType from '../../assets/images/hotelwaze-partner-logotype.png';

const Image = styled.Image`
  width: 204px;
  height: 16px;
`;

const LogoTitle = () => <Image source={LogoType} resizeMode="cover" />;

export default LogoTitle;
