import React from 'react'
import {
     View, 
     Text, 
     FlatList, 
     StyleSheet, 
     Button, 
     TouchableOpacity,
} from 'react-native'

import { CATEGORIES } from '../data/dummy-data'
import CategoryGridTile from '../components/CategoryGridTile'

const CategoriesScreen = props => {

    const renderGridItem = (itemData) => {
        return (<CategoryGridTile 
            color={itemData.item.color}
            title={itemData.item.title} 
            onSelect={()=>{
                props.navigation.navigate({
                    routeName: "CategoryMeals", params: {
                        categoryId: itemData.item.id
                    }
                })
            }}
        />)
           
    }

    return (
        <FlatList
            keyExtractor={(item, index) => item.id}
            data={CATEGORIES}
            numColumns={2}
            renderItem={renderGridItem}
        />
    )
}
CategoriesScreen.navigationOptions = {
    headerTitle: 'Meal Categories',
  };
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
})


export default CategoriesScreen;