import React from 'react'
import {StyleSheet,View,Text} from 'react-native'

import MealList from '../components/MealList'
import {useSelector} from 'react-redux'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'

const FavoriteScreen= props=>{
    
    const favMeals=useSelector(state=>state.meals.favoriteMeals)

    if(favMeals.length===0||!favMeals){
        return (<View style={styles.content}>
            <Text>
                No favorite meals found.
            </Text>
        </View>)
    }

    return (
       <MealList
        listData={favMeals}
        navigation={props.navigation}
       />
    )
}

FavoriteScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Favorite Screen',
        headerLeft:<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
            />
        </HeaderButtons>
        
    }
};

const styles=StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    content:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})


export default FavoriteScreen;
