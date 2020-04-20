import {Platform} from 'react-native'

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import PlacesListScreen from '../screens/PlaceListScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import MapScreen from '../screens/MapScreen';
import PlacesDetailScreen from '../screens/PlacesDetailScreen'

import Colors from '../constants/Colors'

const PlacesNavigator = createStackNavigator(
    {
      Places: PlacesListScreen,
      PlaceDetail:PlacesDetailScreen,
      NewPlace: NewPlaceScreen,
      Map: MapScreen
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
      }
    }
  );
  
  export default createAppContainer(PlacesNavigator);