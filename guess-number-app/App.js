import React,{useState} from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';

export default function App() {

  const [selectedNumber,setSelectedNumber]=useState('');
  
  const startGameHandler = (selectedNumber)=>{
    setUserNumber(selectedNumber);
  }

  let content = <StartGameScreen onStartGame={startGameHandler}/>
  if(selectedNumber){
    content=<GameScreen/>
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
