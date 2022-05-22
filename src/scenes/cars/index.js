import React from 'react';
import ToyotaVios from '../../assets/images/toyota-vios-orange.jpg';
import styled from 'styled-components/native';
import CarCard from '../../components/car-card';

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: #fafafa;
`;

const WrapperInner = styled.View`
  padding: 24px;
`;

const CarsScreen = () => {
  const car = {
    image: 'toyota-vios-orange.jpg',
    type: 'Economy Sedan',
    make: 'Toyota',
    model: 'Vios',
    year: '2022',
    plate: 'DCX 2222',
    transmission: 'AT',
    driver: 'driver optional',
  };

  return (
    <Wrapper>
      <WrapperInner>
        <CarCard car={car} />
      </WrapperInner>
    </Wrapper>
  );
};

export default CarsScreen;
