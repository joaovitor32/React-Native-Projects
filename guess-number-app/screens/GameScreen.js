import React, { useState } from 'react';
import { View, Text, StyleSheet ,Button} from 'react-native'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'

const generatedRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum == exclude) {
        return generatedRandomBetween(min, max, exclude);
    } else {
        return rndNum
    }
}

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(
        generatedRandomBetween(1, 100, props.userChoice)
    );
    return (
        <View style={styles.screen}>
            <Text>Opponent Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="Lower" onPress={()=>{}}/>
                <Button title="Greate" onPress={()=>{}}/>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:'center'
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:20,
        width:300,
        maxWidth:'80%'
    }
})

export default GameScreen;