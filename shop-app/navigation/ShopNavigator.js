import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import ProductsOverviewScreen from '../screens/shop/ProductOverwiewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductScreen from '../screens/user/UserProductsScreen'

import EditProductScreen from '../screens/user/EditProductScreen'

import {Ionicons} from '@expo/vector-icons'

import { Platform } from 'react-native'

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

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions:{
      drawerIcon:drawerConfig=>(
        <Ionicons
          name={Platform.OS==="android"?'md-cart':'ios-cart'}
          size={24}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const OrdersNavigator = createStackNavigator({
  Orders:OrdersScreen
},{
  navigationOptions:{
    drawerIcon:drawerConfig=>(
      <Ionicons
        name={Platform.OS === 'android'?'md-list':'ios-list'}
        size={24}
        color={drawerConfig.tintColor}
      />
    )
  },
  defaultNavigationOptions:defaultNavOptions
})

const AdminNavigator = createStackNavigator({
  UserProducts:UserProductScreen,
  EditProduct:EditProductScreen
},{
  navigationOptions:{
    drawerIcon:drawerConfig=>(
      <Ionicons
        name={Platform.OS === 'android'?'md-create':'ios-create'}
        size={24}
        color={drawerConfig.tintColor}
      />
    )
  },
  defaultNavigationOptions:defaultNavOptions
})

const ShopNavigator=createDrawerNavigator({
  Products:ProductsNavigator,
  Orders:OrdersNavigator,
  Admin:AdminNavigator
},{
  contentOptions:{
    activeTintColor:Colors.primary
  }
})

export default createAppContainer(ShopNavigator)