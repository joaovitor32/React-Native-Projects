import React, { useState, useCallback,useEffect } from 'react'
import { View, Button, Text, FlatList, Platform, ActivityIndicator, StyleSheet } from 'react-native'

import Colors from '../../constants/Colors';

import { useSelector, useDispatch } from 'react-redux'

import * as cartActions from '../../store/actions/cart'
import * as productsActions from '../../store/actions/product'

import ProductItem from '../../components/shop/ProductItem'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'

const ProductsOverviewScreen = props => {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const products = useSelector(state => state.products.avaiableProducts);
    const dispatch = useDispatch();


    const loadedProducts =  useCallback(async() => {
        setError(null)
        setLoading(true);
        try {
            await dispatch(productsActions.fetchProducts());
        } catch (err) {
            setError(err.message)
        }
        setLoading(false)
    },[dispatch,setLoading,setError]);

    const selectItemHandler = (id, title) => {
        props.navigation.navigate(
            "ProductDetail",
            {
                productId: id,
                productTitle: title
            }
        )
    }

    /*useEffect(() => {
        loadedProducts();
    }, [loadedProducts])*/

    useEffect(()=>{
        const willFocusSub=props.navigation.addListener('willFocus',()=>{
            loadedProducts();
        })
        return ()=>{
            willFocusSub.remove();
        }
    },[loadedProducts])

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An error occurred!</Text>
                <Button title="Try again" onPress={loadedProducts} color={Colors.primary}/>
            </View>)
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>)
    }

    if (!isLoading && products.length == 0) {
        return (
            <View style={styles.centered}>
                <Text>No product was found.</Text>
            </View>)
    }

    return <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={itemData => (
            <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => {
                    selectItemHandler(itemData.item.id, itemData.item.title)
                }}
            >
                <Button color={Colors.primary} title="View details" onPress={() => {
                    selectItemHandler(itemData.item.id, itemData.item.title)
                }} />
                <Button color={Colors.primary} title="To Cart" onPress={() => {
                    dispatch(cartActions.addToCart(itemData.item))
                }} />
            </ProductItem>)
        }
    />
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: "All products",
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Menu"
                iconName={Platform.OS === "android" ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
            />
        </HeaderButtons>,
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Cart"
                iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                onPress={() => {
                    navData.navigation.navigate('Cart')
                }}
            />
        </HeaderButtons>
    }
}

export default ProductsOverviewScreen;