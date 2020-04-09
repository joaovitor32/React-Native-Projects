import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

import { useSelector } from 'react-redux'
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem'

const CartScreen = props => {

    const cartTotalAmount = useSelector(state => state.cart.totalAmount)
    const carItems = useSelector(state => {
        const transformedCart = [];
        for (const key in state.cart.items) {
            transformedCart.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }
        return transformedCart;
    })
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total:
                    <Text style={styles.amount}> ${cartTotalAmount.toFixed(2)} </Text>
                </Text>
                <Button
                    color={Colors.accent}
                    title="Order Now"
                    disabled={
                        carItems.length === 0
                    }
                />
            </View>
            <FlatList
                data={carItems}
                keyExtractor={item => item.productId}
                renderItem={itemData=><CartItem
                    quantity={itemData.item.quantity}
                    title={itemData.item.title}
                    amount={itemData.item.sum}
                    onRemove={()=>{}}
                />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'

    },
    summaryText: {
        fontSize: 18,
        fontFamily: "open-sans-bold"
    },
    amount: {
        color: Colors.primary
    }
})

export default CartScreen;