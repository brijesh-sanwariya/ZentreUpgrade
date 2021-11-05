import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import TabBar from '../components/TabBar';
import {Feed, More, Profile} from '../screens/Tabs';
import ContactsStackNav from './ContactsStackNav';
import FeedStackNav from './FeedStackNav';
import {Platform} from 'react-native';
import MoreStackNav from './MoreStackNav'

function MainTabNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerTitleStyle: {
          fontFamily: Platform.OS === 'ios' ? 'Roboto-Medium' : 'RobotoMedium',
        },
        tabBarLabelStyle: {
          fontFamily: Platform.OS === 'ios' ? 'Roboto-Medium' : 'RobotoMedium',
        },
      }}
      initialRouteName={'ContactsStack'}
      tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="Feed" component={FeedStackNav} />
      <Tab.Screen name="ContactsStack" component={ContactsStackNav} />
      <Tab.Screen name="More" component={MoreStackNav} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default MainTabNav;
