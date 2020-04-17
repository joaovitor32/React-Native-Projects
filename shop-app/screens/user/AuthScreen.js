import React, { useReducer, useCallback } from 'react'
import {
    ScrollView,
    View,
    KeyboardAvoidingView,
    Text,
    StyleSheet,
    Button
} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

import { useDispatch } from 'react-redux'
import * as authAction from '../../store/actions/auth'

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card'
import Colors from '../../constants/Colors';

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
    if (action.type == FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidites,
            [action.input]: action.isValid
        }
        let updateFormIsValid = true;
        for (const key in updatedValidities) {
            updateFormIsValid = updateFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updateFormIsValid,
            inputValidites: updatedValidities,
            inputValues: updatedValues
        }
    }
    return state;
}

const AuthScreen = props => {

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: "",
            password: ""
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    })

    const dispatch = useDispatch();

    const signupHandler = () => {
        dispatch(authAction.signup(
            formState.inputValues.email,
            formState.inputValues.password
        )
        )
    }

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type:FORM_INPUT_UPDATE,
            value:inputValue,
            isValid:inputValidity,
            input:inputIdentifier
        })
    },[dispatchFormState])

    return (
        <KeyboardAvoidingView behaviour="padding" KeyboardVerticalOffset={50} style={styles.screen}>
            <LinearGradient
                colors={['#ffedff', '#ffe3ff']}
                style={styles.gradient}
            >
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id="email"
                            label="Email"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorText="Please enter a valid email address"
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <Input
                            id="password"
                            label="password"
                            keyboardType="default"
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorText="Please enter a valid password address"
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <View style={styles.buttonContainer}>
                            <Button title="Login" color={Colors.primary} onPress={signupHandler} />
                        </View>
                        <Button title="Switch to Sign Up" color={Colors.accent} onPress={() => { }} />
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

AuthScreen.navigationOptions = {
    headerTitle: "Authenticate"
}

const styles = StyleSheet.create({
    authContainer: {
        width: "80%",
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    screen: {
        flex: 1,

    },
    gradient: {
        flex: 1,
        width: '100%',
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonContainer: {
        marginTop: 10,
        marginBottom: 10
    }
})

export default AuthScreen;