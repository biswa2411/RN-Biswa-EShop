import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../screens/LoginScreen';
import ProductListingScreen from '../screens/ProductListScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CartScreen from '../screens/CartScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import CustomDrawerContent from '../components/navigationsHelper/CustomDrawerContent';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// 🟢 Bottom Tabs (Products, Cart, Orders)
const Tabs = () => (
  <Tab.Navigator screenOptions={{  }}>
    <Tab.Screen name="Products" component={ProductListingScreen} />
    <Tab.Screen name="Cart" component={CartScreen} />
    <Tab.Screen name="Orders" component={OrderDetailsScreen} />
  </Tab.Navigator>
);

// 🟡 Drawer with Bottom Tabs
// const DrawerNavigator = () => (
//   <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
//     <Drawer.Screen name="Home" component={Tabs} options={{ headerShown: false }} />
//   </Drawer.Navigator>
// );

// 🔴 Main Navigation (Login + Drawer)
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
