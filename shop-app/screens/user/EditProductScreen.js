import React, { useEffect, useCallback, useReducer } from 'react'
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Platform,
    StyleSheet,
    Alert,
    KeyboardAvoidingView
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton'

import Input from '../../components/UI/Input'

import { useSelector, useDispatch } from 'react-redux'
import * as productsActions from '../../store/actions/product'

const FORM_INPUT_UPDATE = 'UPDATE'

const formReducer = (state, action) => {
    if (action.type == FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updateValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid

        }
        let updateFormIsValid = true;
        for (const key in updateValidities) {
            updateFormIsValid = updateFormIsValid && updateValidities[key]
        }
        return {
            formIsValid: updateFormIsValid,
            inputValues: updatedValues,
            inputValidities: updateValidities
        }
    }
    return state;
}

const EditedProductScreen = props => {

    const prodId = props.navigation.getParam('productId')

    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));

    /*
        const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
        const [titleIsValid,setTitleIsValid]=useState(false)

        const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
        const [price, setPrice] = useState('');
        const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');
    */
    const dispatch = useDispatch()

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: ''
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,
        },
        formIsValid: editedProduct ? true : false
    })

    const submitHandler = useCallback(() => {
        console.log(formState)
        if (!formState.formIsValid) {
            Alert.alert('Wrong input', 'Please check the errors in the form',
                [{ text: 'ok' }]
            )
            return;
        }
        if (editedProduct) {
            dispatch(
                productsActions.updateProduct(
                    prodId,
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl)
            );
        } else {
            dispatch(
                productsActions.createProduct(
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl,
                    +formState.inputValues.price)
            );
        }
        props.navigation.goBack()
    }, [dispatch, formState]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler])

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFormState])

    return (
        <KeyboardAvoidingView style={{flex:1}} behavior="padding" KeyboardVerticalOffset={100}>
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id="title"
                        label="Title"
                        errorText="Please enter a valid title!"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.title : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    <Input
                        id="imageUrl"
                        label="Image Url"
                        errorText="Please enter a valid image url!"
                        keyboardType="default"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    {editedProduct ? null : (
                        <Input
                            id="price"
                            label="Price"
                            errorText="Please enter a valid price!"
                            keyboardType="decimal-pad"
                            returnKeyType="next"
                            onInputChange={inputChangeHandler}
                            required
                            min={0.1}
                        />
                    )}
                    <Input
                        id="description"
                        label="Description"
                        errorText="Please enter a valid description!"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={!!editedProduct}
                        required
                        minLength={5}

                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>

    )
}

EditedProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit')
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Update product' : 'Add product',
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title='Save'
                iconName={Platform.OS === "android" ? 'md-checkmark' : 'md-checkmark'}
                onPress={submitFn}
            />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
})

export default EditedProductScreen;