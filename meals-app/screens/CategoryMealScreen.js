import React from 'react'
import {View,Text,StyleSheet,Button,Platform} from 'react-native'

import Colors from '../constants/Colors'
import {CATEGORIES} from '../data/dummy-data'

const CategorieMealsScreen= props=>{
    const catId=props.navigation.getParam('categoryId');

    const selectedCategory=CATEGORIES.find(cat=>cat.id===catId)

    return (
        <View style={styles.screen}>
            <Text>CategorieMealScreen</Text>
            <Text>{selectedCategory.title}</Text>
            <Button title="Go to details" onPress={()=>{
                props.navigation.push(
                    "MealDetail"
                )
            }} />
            <Button title="Go back" onPress={()=>{
                props.navigation.goBack();
                
            }} />
        </View>
    )
}

CategorieMealsScreen.navigationOptions=navigationData=>{  
    const catId= navigationData.navigation.getParam('categoryId');

    const selectedCategory=CATEGORIES.find(cat=>cat.id===catId)

    return {
        headerTitle:selectedCategory.title,
        headerStyle:{
            backgroundColor: Platform.OS ==="android"?Colors.primaryColor:""
        },
        headerTintColor:Platform.OS ==="android"?"white":Colors.primaryColor

    }

}

const styles=StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})


export default CategorieMealsScreen;
