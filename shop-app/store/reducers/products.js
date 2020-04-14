import PRODUCTS from '../../data/data'
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from '../actions/product'
import Product from '../../models/product'

const initialState = {
  avaiableProducts:[],
  userProducts:[],
};


export default (state=initialState , action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        avaiableProducts:action.products,
        userProducts:action.products.filter(prod=>prod.ownerId==="u1")

      }
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        'u1',
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        avaiableProducts: state.avaiableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct)
      }
    case UPDATE_PRODUCT:
      
      const productIndex = state.userProducts.findIndex(
        prod => prod.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;
      const availableProductIndex = state.avaiableProducts.findIndex(
        prod => prod.id === action.pid
      );
      const updatedavaiableProducts = [...state.avaiableProducts];
      updatedavaiableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        avaiableProducts: updatedavaiableProducts,
        userProducts: updatedUserProducts
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          product => product.id !== action.pid
        ),
        avaiableProducts: state.avaiableProducts.filter(
          product => product.id !== action.pid
        ),
      };
  }
  return state;
};