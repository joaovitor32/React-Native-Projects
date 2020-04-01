import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView,FlatList,Dimensions } from 'react-native'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import MainButton from '../components/MainButton'
import BodyText from '../components/BodyText'
import { Ionicons } from '@expo/vector-icons'

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

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
);

const GameScreen = props => {
    const initialGuest = generatedRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(
        initialGuest
    );
    const [pastGuesses, setPastGuesses] = useState([initialGuest])
    const currentLow = useRef(1);
    const currentHigh = useRef(100)


    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = direction => {
        if (
            (direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)
        ) {
            Alert.alert("Don't lie!", 'You know that this is wrong...', [
                { text: 'Sorry!', style: 'cancel' }
            ]);
            return;
        }
        if (direction === "lower") {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generatedRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber);
        //setRounds(currRoutes=>currRoutes+1)
        setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses])
    }


    return (
        <View style={styles.screen}>
            <Text>Opponent Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton
                    onPress={nextGuessHandler.bind(this, 'lower')} >
                    <Ionicons color="white" size={24} name="md-remove" />
                </MainButton>
                <MainButton
                    onPress={nextGuessHandler.bind(this, 'greater')}
                ><Ionicons color="white" size={24} name="md-add" /></MainButton>
            </Card>
            {/*  <View style={styles.list}>
                <ScrollView>
                    {pastGuesses.map((guess,index) => renderListItem(guess,pastGuesses.length-index))}
                </ScrollView>
            </View>*/}
            <FlatList
                keyExtractor={item => item.toString()}
                data={pastGuesses}
                renderItem={renderListItem.bind(this, pastGuesses.length)}
                contentContainerStyle={styles.list}
            />
        </View >
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height>600?20:5,
        width: "100%",
        maxWidth: '90%'
    },
    list: {
        flex: 1,
        width: "80%",
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%'
    }
})

export default GameScreen;