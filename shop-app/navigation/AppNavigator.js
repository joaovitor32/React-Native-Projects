import React from 'react';
import {ProductsNavigator} from './ShopNavigator';

import {NavigationContainer}from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import {useSelector} from 'react-redux'


const AppNavigator=props=>{
    const isAuth=useSelector(state=>!!state.auth.token);

    return (<NavigationContainer>
        <ProductsNavigator/>
    </NavigationContainer>);
}

export default AppNavigator;