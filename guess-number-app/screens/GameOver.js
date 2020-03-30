import React from 'react'
import { View, Text, StyleSheet,Button ,Image} from 'react-native'

import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton'

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <BodyText>The Game is over!</BodyText>
            <Image 
                style={styles.image} 
                source={require('../assets/sucess.png')}
                resizeMode="cover"
            />
            <BodyText>Number of rounds: {props.roundsNumber}</BodyText>
            <BodyText>The number was: {props.roundsNumber}</BodyText>
            <MainButton  onPress={props.onRestart}>New Game</MainButton>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    },
    image:{
        width:"80%",
        height:300,
    }
})

export default GameOverScreen;