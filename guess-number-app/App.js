import React,{useState} from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOver';
import * as Font from 'expo-font';
import {AppLoading} from 'expo'

const fetchFonts=()=>{
  return Font.loadAsync({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {

  const [userNumber,setUserNumber]=useState();
  const [guessRounds,setGuessRounds]=useState(0);
  const [dataLoaded,setDataLoaded]=useState(false);

  const configureNewGameHandler = () =>{
    setGuessRounds(0);
    setUserNumber(null)
  }

  if(!dataLoaded){
    return (<AppLoading 
      startAsync={fetchFonts} 
      onFinish={()=>setDataLoaded(true)}/>)
  }

  const startGameHandler = (selectedNumber)=>{
    setUserNumber(selectedNumber);
    setGuessRounds(0)
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />

  const gameOverHandler=numOfRounds=>{
    setGuessRounds(numOfRounds);
  }

  if(userNumber && guessRounds<=0){
    content=<GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
  }else if(guessRounds>0){
    content=<GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler}/>
  }

  return (
    <View style={styles.screen} >
      <Header title="Guess a number:"/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex:1
  }
});
