import React,{useState} from 'react';
import { View, ScrollView, Button,TextInput, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

import {useDispatch} from 'react-redux'
import * as placeActions from '../store/places-actions'

import ImgPicker from '../components/ImagePicker'
import LocationPicker from '../components/LocationPicker'

const NewPlaceScreen = props => {

    const dispatch=useDispatch();
    const [title,setTitle]=useState('');
    const [image,setImage]=useState(null);

    const titleChangeHandler=text=>{
        setTitle(text);
    }


    const savePlaceHandler=()=>{
        dispatch(placeActions.addPlace(title,image));
        props.navigation.goBack();
    };

    const imageTakenHandler=imagePath=>{
        setImage(imagePath)
    }

    return (<ScrollView>
        <View style={styles.form}>
            <Text style={styles.label}>Title</Text>
            <TextInput 
                style={styles.textInput}
                onChangeText={titleChangeHandler}
                value={title}
            style={styles.textInput}/>
            <ImgPicker onImageTaken={imageTakenHandler}/>
            <LocationPicker navigation={props.navigation}/>
            <Button
                title="Save place"
                color={Colors.primary}
                onPress={savePlaceHandler}
            />
        </View>
    </ScrollView>)
}

NewPlaceScreen.navigationOptions = {
    headerTitle: "New place"
}

const styles = StyleSheet.create({
    form:{
        margin:30
    },  

    label:{
        fontSize:18,
        marginBottom:15
    },
    textInput:{
        borderBottomColor:"#ccc",
        borderBottomWidth:1,
        marginBottom:15,
        paddingVertical:4,
        paddingHorizontal:2
    }
})

export default NewPlaceScreen;