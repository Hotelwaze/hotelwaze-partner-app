import React, { useContext, useEffect, useState } from 'react';
import ToyotaVios from '../../assets/images/toyota-vios-orange.jpg';
import styled from 'styled-components/native';
import CarCard from '../../components/car-card';
import httpService from '../../services/http';
import { AuthContext } from '../../context/auth-manager';
import { FlatList, Text } from 'react-native';

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: #fafafa;
`;

const WrapperInner = styled.View`
  padding: 24px;
`;

const LoadingWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CarsScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    if (authContext?.restored) {
      getCars(
        authContext?.authState?.accessToken,
        authContext?.authState?.user.PartnerId,
      );
    }
  }, []);

  const getCars = async (token, partnerId) => {
    try {
      setLoading(true);

      const result = await httpService.getCars(token, partnerId);

      if (result.status === 200) {
        setLoading(false);
        setCarList(result.data.data);
        return;
      }

      throw new Error('Failed to fetch users');
    } catch (e) {
      setLoading(false);
      console.log('Error: ', e.message);
    }
  };

  return (
    <Wrapper>
      {loading ? (
        <LoadingWrapper>
          <Text>Loading cars...</Text>
        </LoadingWrapper>
      ) : (
        <WrapperInner>
          <FlatList
            data={carList}
            renderItem={({ item }) => (
              <CarCard
                onPress={() => navigation.navigate('Car', { car: item })}
                car={item}
              />
            )}
            keyExtractor={(car, index) => index}
          />
        </WrapperInner>
      )}
    </Wrapper>
  );
};

export default CarsScreen;
