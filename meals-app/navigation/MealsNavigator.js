import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createBottomTabNavigator } from 'react-navigation-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealScreen from '../screens/CategoryMealScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import FavoriteScreen from '../screens/FavoritesScreen'
import FiltersScreen from '../screens/FiltersScreen';

import { Platform ,Text} from 'react-native'
import Colors from '../constants/Colors'

import { Ionicons } from '@expo/vector-icons';

const defaultStackNavOptions = {
  // initialRouteName: 'Categories',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTitleStyle:{
      fontFamily:"open-sans-bold",
    },
    headerTintColor:
      Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    headerTitle: 'A Screen'
  }
}

const MealsNavigator = createStackNavigator({
  Categories: {
    screen: CategoriesScreen,
  },
  CategoryMeals: {
    screen: CategoryMealScreen,
  },
  MealDetail: MealDetailScreen
}, defaultStackNavOptions)

const FavNavigator = createStackNavigator({
  Favorites: FavoriteScreen,
  MealDetail: MealDetailScreen
}, defaultStackNavOptions)

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons
            name="ios-restaurant"
            size={25}
            color={tabInfo.tintColor}
          />
        );
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel:Platform.OS==="android"?<Text style={{fontFamily:"open-sans-bold"}}>Meals</Text>:"Meals",
    }
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarLabel: 'Favorites!',
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel:Platform.OS==="android"?<Text style={{fontFamily:"open-sans-bold"}}>Favorites</Text>:"Meals",
    }
  }
}

const MealsFavTabNavigator = Platform.OS == "android" ?
  createMaterialBottomTabNavigator(tabScreenConfig, {
    activeTintColor: "white",
    shifting: true
  }) :
  createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: {
      labelStyle:{
        fontFamily:'open-sans',
      },
      activeTintColor: Colors.accentColor
    }
  })

const FilterNavigator = createStackNavigator({
  Filters: FiltersScreen,
},
  defaultStackNavOptions
)

const MainNavigator = createDrawerNavigator({
  MealsFav: {
    screen: MealsFavTabNavigator,
    navigationOptions:{
      drawerLabel:"Meals"
    }
  },
  Filters:{
     screen:FilterNavigator,
     navigationOptions:{
       drawerLabel:"Filter"
     }
  }
},{
  contentOptions:{
    activeTintColor:Colors.accentColor,
    labelStyle:{
      fontFamily:"open-sans-bold"
    }
  }
})

export default createAppContainer(MainNavigator)

