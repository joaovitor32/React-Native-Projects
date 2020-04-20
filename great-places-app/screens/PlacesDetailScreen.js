import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

const PlacesDetailsScreen = props=>{
    return (<View>
        <Text>PlaceDetailsScreen</Text>
    </View>)
}

PlacesDetailsScreen.navigationOptions=navData=>{
    return {
        headerTitle: navData.navigation.getParam('placeTitle')
    }
}

const styles=StyleSheet.create({
    
})

export default PlacesDetailsScreen;