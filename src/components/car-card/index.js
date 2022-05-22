import React, { useEffect } from 'react';
import Config from 'react-native-config';
import styled from 'styled-components/native';

const Wrapper = styled.Pressable`
  margin-bottom: 24px;
`;

const Card = styled.View`
  align-self: stretch;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  position: relative;
  border-width: 1px;
  border-color: #d6d6d6;
`;

const ImageContainer = styled.View`
  width: 100%;
  height: 195px;
  background: #fafafa;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
`;

const Image = styled.Image`
  resize-mode: cover;
  width: 100%;
  height: 100%;
`;

const DetailsContainer = styled.View`
  padding: 12px;
`;

const CarType = styled.Text`
  font-family: 'Montserrat-Regular';
  font-size: 12px;
  line-height: 16px;
  color: #595959;
`;

const CarMakeModelYear = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 14px;
  line-height: 18px;
  color: #262626;
`;

const CarPlateNumber = styled.Text`
  font-family: 'Montserrat-Regular';
  font-size: 14px;
  line-height: 18px;
  color: #262626;
`;

const RentalPriceMeta = styled.View`
  margin-top: 8px;
`;

const PriceRow = styled.View`
  flex-direction: row;
  margin-bottom: 4px;
`;

const PriceLabel = styled.Text`
  font-family: 'Montserrat-Regular';
  font-size: 14px;
  line-height: 18px;
  color: #262626;
  width: 40%;
`;

const PriceValue = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 14px;
  line-height: 18px;
  color: #262626;
`;

const CarOptions = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

const CarOption = styled.View`
  padding: 4px 12px;
  border-radius: 12px;
  background: #565656;
  margin-right: 8px;
`;

const CarOptionTransmission = styled(CarOption)`
  background: #f61a88;
`;

const CarOptionDriver = styled(CarOption)`
  background: #023b6b;
`;

const CarOptionLabel = styled.Text`
  color: #ffffff;
  font-family: 'Montserrat-SemiBold';
  font-size: 12px;
  line-height: 16px;
`;

const CarCard = ({
  car: { image, type, make, model, year, plate, transmission, driver },
}) => {
  return (
    <Wrapper>
      <Card>
        <ImageContainer>
          <Image
            source={{
              uri: `${Config.ASSETS_URL}${image}`,
            }}
          />
        </ImageContainer>
        <DetailsContainer>
          <CarType>{type}</CarType>
          <CarMakeModelYear>
            {make} {model} {year}
          </CarMakeModelYear>
          <CarPlateNumber>{plate}</CarPlateNumber>
          <RentalPriceMeta>
            <PriceRow>
              <PriceLabel>Rental Per Day:</PriceLabel>
              <PriceValue>₱3000.00</PriceValue>
            </PriceRow>
            <PriceRow>
              <PriceLabel>Driver Per Day:</PriceLabel>
              <PriceValue>₱1500.00</PriceValue>
            </PriceRow>
          </RentalPriceMeta>
          <CarOptions>
            <CarOptionTransmission>
              <CarOptionLabel>{transmission}</CarOptionLabel>
            </CarOptionTransmission>
            <CarOptionDriver>
              <CarOptionLabel>driver {driver}</CarOptionLabel>
            </CarOptionDriver>
          </CarOptions>
        </DetailsContainer>
      </Card>
    </Wrapper>
  );
};

export default CarCard;
