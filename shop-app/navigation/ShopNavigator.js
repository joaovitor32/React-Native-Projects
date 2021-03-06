import React from 'react'

import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator} from '@react-navigation/drawer'

import ProductsOverviewScreen,{screenOptions} from '../screens/shop/ProductOverwiewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductScreen from '../screens/user/UserProductsScreen'
import AuthScreen from '../screens/user/AuthScreen'
import EditProductScreen from '../screens/user/EditProductScreen'
import StartupScreen from '../screens/StartupScreen';

import {useDispatch} from 'react-redux'

import * as authActions from '../store/actions/auth';

import { Ionicons } from '@expo/vector-icons'

import { Platform, SafeAreaView, Button, View } from 'react-native'

import Colors from '../constants/Colors'

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

const ProductsStackNavigator=createStackNavigator()

export const ProductsNavigator=()=>{
  return (<ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen 
          name="ProductsOverview" 
          component={ProductsOverviewScreen}
          options={screenOptions}
        />
      <ProductsStackNavigator.Screen 
          name="ProductDetail" 
          component={ProductDetailScreen}
        />
      <ProductsStackNavigator.Screen 
          name="Cart" 
          component={CartScreen}
      />
  </ProductsStackNavigator.Navigator>)
}

/*const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === "android" ? 'md-cart' : 'ios-cart'}
          size={24}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const OrdersNavigator = createStackNavigator({
  Orders: OrdersScreen
}, {
  navigationOptions: {
    drawerIcon: drawerConfig => (
      <Ionicons
        name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
        size={24}
        color={drawerConfig.tintColor}
      />
    )
  },
  defaultNavigationOptions: defaultNavOptions
})

const AdminNavigator = createStackNavigator({
  UserProducts: UserProductScreen,
  EditProduct: EditProductScreen
}, {
  navigationOptions: {
    drawerIcon: drawerConfig => (
      <Ionicons
        name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
        size={24}
        color={drawerConfig.tintColor}
      />
    )
  },
  defaultNavigationOptions: defaultNavOptions
})

const ShopNavigator = createDrawerNavigator({
  Products: ProductsNavigator,
  Orders: OrdersNavigator,
  Admin: AdminNavigator
}, {
  contentOptions: {
    activeTintColor: Colors.primary
  },
  contentComponent: props => {
    const dispatch=useDispatch();
    return (<View style={{ flex: 1,paddingTop:20 }}>
      <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
        <DrawerItems {...props} />
        <Button 
          title="Logout" 
          color={Colors.primary}
          onPress={()=>{
            dispatch(authActions.logout());
          }}  
        />
      </SafeAreaView>
    </View>)
  }
})

const AuthNavigator = createStackNavigator({
  Auth: AuthScreen
}, {
  defaultNavigationOptions: defaultNavOptions
})

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
})

export default createAppContainer(MainNavigator)*/