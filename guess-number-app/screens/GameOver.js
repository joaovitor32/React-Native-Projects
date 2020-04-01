import React from 'react'
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native'

import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton'

const GameOverScreen = props => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <BodyText>The Game is over!</BodyText>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={require('../assets/sucess.png')}
                        resizeMode="cover"
                    />
                </View>
                <BodyText>Number of rounds: {props.roundsNumber}</BodyText>
                <BodyText>The number was: {props.roundsNumber}</BodyText>
                <MainButton onPress={props.onRestart}>New Game</MainButton>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: "black",
        overflow: "hidden",
        marginVertical: Dimensions.get('window').height / 10
    },
    image: {
        width: "100%",
        height: "100%",
    }
})

export default GameOverScreen;