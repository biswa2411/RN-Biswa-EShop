import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import LoginScreen from '../screens/LoginScreen';
import ProductListingScreen from '../screens/ProductListScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CartScreen from '../screens/CartScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const tabIcons = {
  Products: 'shopping-outline',
  Cart: 'cart-outline',
  Orders: 'clipboard-list-outline',
};
const Tabs = () => (
  <Tab.Navigator
   screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => (
        <Icon name={tabIcons[route.name]} size={size} color={color} />),
      tabBarActiveTintColor: '#6200ea',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: { backgroundColor: '#fff', paddingBottom: 5, height: 60 },
    })}>
    <Tab.Screen name="Products" component={ProductListingScreen} />
    <Tab.Screen name="Cart" component={CartScreen} />
    <Tab.Screen name="Orders" component={OrderDetailsScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
 