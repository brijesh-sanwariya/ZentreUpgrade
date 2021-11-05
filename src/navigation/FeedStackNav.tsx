import React from 'react';
import {} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
const Stack = createStackNavigator();

import {Feed} from '../screens/Tabs';
import {CreateFeed} from '../screens';
function ContactsStackNav({route, navigation}) {
  const focusedRoute = getFocusedRouteNameFromRoute(route);
  if (focusedRoute === 'Feed' || focusedRoute === undefined) {
    navigation.setOptions({tabBarVisible: true});
  } else {
    navigation.setOptions({tabBarVisible: false});
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="CreateFeed" component={CreateFeed} />
    </Stack.Navigator>
  );
}

export default ContactsStackNav;
