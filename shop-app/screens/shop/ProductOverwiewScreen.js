import React from 'react'
import { FlatList,Platform } from 'react-native'

import { useSelector,useDispatch } from 'react-redux'

import * as cartActions from '../../store/actions/cart'

import ProductItem from '../../components/shop/ProductItem'

import {HeaderButtons,Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.avaiableProducts);
    const dispatch=useDispatch();

    return <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={itemData =>(
            <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onViewDetail={() => {
                    props.navigation.navigate(
                        "ProductDetail",
                        {
                            productId: itemData.item.id,
                            productTitle:itemData.item.title
                        }
                    )
                }}
                onAddToChart={() => {
                    dispatch(cartActions.addToCart(itemData.item))
                }}
            />)
        }
    />
}

ProductsOverviewScreen.navigationOptions=navData => {
    return {headerTitle: "All products",
    headerRight:<HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
            title="Cart"
            iconName={Platform.OS==="android"?"md-cart":"ios-cart"}
            onPress={()=>{
                navData.navigation.navigate('Cart')
            }}
        />
    </HeaderButtons>}
}

export default ProductsOverviewScreen;