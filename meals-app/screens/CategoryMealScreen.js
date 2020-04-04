import React from 'react'
import {View,Text,StyleSheet,Button,FlatList} from 'react-native'

import {CATEGORIES,MEALS} from '../data/dummy-data'
import MealItem from '../components/MealItem'


const CategorieMealsScreen= props=>{
    const catId=props.navigation.getParam('categoryId');

    const displayedMeals=MEALS.filter(meal=>meal.categoryIds.indexOf(catId)>=0)

    const renderMealItem=itemData=>{
        return (
           <MealItem
                title={itemData.item.title}
                duration={itemData.item.duration}
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability}
                image={itemData.item.imageUrl}
                onSelectMeal={()=>{
                    props.navigation.navigate({routeName:"MealDetail",
                        params:{
                            mealId:itemData.item.id
                        }               
                    })
                }}
           />
        )
    }

    return (
        <View style={styles.screen}>
            <FlatList
                data={displayedMeals}
                keyExtractor={(item,index)=>item.id}
                renderItem={renderMealItem}
                style={{width:"100%"}}
            />
        </View>
    )
}

CategorieMealsScreen.navigationOptions=navigationData=>{  
    const catId= navigationData.navigation.getParam('categoryId');

    const selectedCategory=CATEGORIES.find(cat=>cat.id===catId)

    return {
        headerTitle:selectedCategory.title,
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
