import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

import DefaultText from '../components/DefaultText';

const MealItem = props => {
    return (
        <View style={styles.mealItem}>
            <TouchableOpacity onPress={props.onSelectMeal}>
                <View >
                    <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
                        <ImageBackground style={styles.bgImage} source={{ uri: props.image }}>
                            <View style={styles.titleContainer}>
                                <Text numberOfLines={1} style={styles.title}>
                                    {props.title}
                                </Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
                        <DefaultText>
                            {props.duration}m
                        </DefaultText>
                        <DefaultText>
                            {props.complexity.toUpperCase()}
                        </DefaultText>
                        <DefaultText>
                            {props.affordability.toUpperCase()}
                        </DefaultText>
                    </View>
                </View>
            </TouchableOpacity>
        </View>)
}

const styles = StyleSheet.create({
    mealItem: {
        height: 200,
        width: '100%',
        backgroundColor: "#f5f5f5",
        borderRadius:10,
        overflow:"hidden"
    },
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    mealRow: {
        flexDirection: 'row',
    },
    mealHeader: {
        height: "85%",
    },
    mealDetail: {
        paddingHorizontal: 10,
        justifyContent: "space-between",
        alignItems:"center",
        height:"15%"
    },
    title: {
        fontFamily: "open-sans-bold",
        color: 'white',
        fontSize: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 5,
        paddingHorizontal: 12,
        textAlign: "center",

    },
    titleContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 5,
        paddingHorizontal: 12
    },
})

export default MealItem;