import * as FileSystem from 'expo-file-system'

import ENV from '../env'

export const ADD_PLACE="ADD_PLACE";
export const SET_PLACES="SET_PLACES";

import {insertPlace, fetchPlaces} from '../helpers/db'

export const addPlace=(title,imageUri,location)=>{
    return async dispatch=>{

        const response=await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`)
        const fileName=imageUri.split('/').pop();
        const newPath=FileSystem.documentDirectory+fileName;


        if(!response.ok){
            throw new Error("Something went wrong!")
        }
        
        const resData=await response.json();

        if(!resData.results){
            throw new Error('Something went wrong!');
        }

        const address=resData.results[0].formatted_address;
    
        try{
            await FileSystem.moveAsync({
                from:imageUri,
                to:newPath
            })
            const dbResult=await insertPlace(
                title,
                newPath,
                address,
                location.lat,
                location.lng
            )
       
            dispatch({type:ADD_PLACE,placeData:{id:dbResult.insertId,title:title,imageUri:newPath,address:address,coords:{
                lat:location.lat,
                lng:location.lng
            }}})
        }catch(err){
            throw err; 
        }

    }
}
export const loadPlaces = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPlaces();
            dispatch({ type: SET_PLACES, places: dbResult.rows._array });
        } catch (err) {
            throw err;
        }
    };
};