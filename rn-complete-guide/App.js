import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {

  const [isAddMode,setIsAddMode]=useState(false)
  const [courseGoals, setCourseGoals] = useState([])

  const addGoalHandler = (goalTitle) => {
    setCourseGoals(currentGoals => [
      ...currentGoals,
      { id: Math.random().toString(),value:goalTitle }])
    setIsAddMode(false)
  }

  const removeGoalHandler=goalId=>{
    setCourseGoals(currentGoals=>{
      return  currentGoals.filter((goal)=> goal.id!==goalId);
    })
  }

  const cancelGoalAdditionHandler=()=>{
    setIsAddMode(false)
  }

  return (
    <View style={styles.screen}>
      <Button title="Add new goal" onPress={()=>setIsAddMode(true)}/>
      <GoalInput onCancel={cancelGoalAdditionHandler} visible={isAddMode} onAddGoal={addGoalHandler}/>
      <FlatList data={courseGoals} renderItem={itemData => (
        <GoalItem  id={itemData.item.id}  onDelete={removeGoalHandler} title={itemData.item.value} />
      )}>
      </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },

});
