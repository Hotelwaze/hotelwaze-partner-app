import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CarsScreen from '../scenes/cars';
import BookingsScreen from '../scenes/bookings';
import DashboardScreen from '../scenes/dashboard';
import DriversScreen from '../scenes/drivers';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import LogoTitle from '../components/logo-title';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if (route.name === 'Dashboard') {
          iconName = 'gauge';
        } else if (route.name === 'Bookings') {
          iconName = 'calendar-lines-pen';
        } else if (route.name === 'Cars') {
          iconName = 'cars';
        } else if (route.name === 'Drivers') {
          iconName = 'people-group';
        }

        // You can return any component that you like here!
        return (
          <FontAwesomeIcon icon={['fas', iconName]} size={size} color={color} />
        );
      },
      tabBarActiveTintColor: '#023B6B',
      tabBarInactiveTintColor: '#595959',
      tabBarLabelStyle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 11,
      },
    })}>
    <Tab.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{
        // eslint-disable-next-line react/jsx-props-no-spreading
        headerTitle: props => <LogoTitle {...props} />,
      }}
    />
    <Tab.Screen
      name="Bookings"
      component={BookingsScreen}
      options={{
        title: 'My Bookings',
        tabBarLabel: 'Bookings',
        headerTitleStyle: {
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 18,
          lineHeight: 22,
          color: '#262626',
        },
      }}
    />
    <Tab.Screen
      name="Cars"
      component={CarsScreen}
      options={{
        title: 'My Cars',
        tabBarLabel: 'Cars',
        headerTitleStyle: {
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 18,
          lineHeight: 22,
          color: '#262626',
        },
      }}
    />
    <Tab.Screen
      name="Drivers"
      component={DriversScreen}
      options={{
        title: 'My Drivers',
        tabBarLabel: 'Drivers',
        headerTitleStyle: {
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 18,
          lineHeight: 22,
          color: '#262626',
        },
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
