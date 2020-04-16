import React, { useEffect,useState } from 'react';
import { Text, View, FlatList, Platform,StyleSheet,ActivityIndicator } from 'react-native';
import { useSelect, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton';
import { useSelector } from 'react-redux'

import * as ordersActions from '../../store/actions/orders'

import OrderItem from '../../components/shop/OrderItem'
import Colors from '../../constants/Colors';

const OrdersScreen = props => {
    const [isLoading, setIsLoading] = useState(false);

    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        dispatch(ordersActions.fetchOrders()).then(() => {
            setIsLoading(false);
        });
    }, [dispatch]);


    if(isLoading){
        return (<View style={styles.centered}>
            <ActivityIndicator
                size="large"
                color={Colors.primary}
            />
        </View>)
    }

    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <OrderItem
                    amount={itemData.item.totalAmount}
                    date={itemData.item.readableDate}
                    items={itemData.item.items}
                />
            )}
        />
    );
};

const styles=StyleSheet.create({
    centered:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})


OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: "Your Orders",
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName={Platform.OS === "android" ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        )
    }
}

export default OrdersScreen;