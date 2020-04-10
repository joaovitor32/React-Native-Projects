import PRODUCTS from '../../data/data'

const initialState={
    avaiableProducts:PRODUCTS,
    userProducts:PRODUCTS.filter(prod=>prod.ownerId=="u1")
}

export default (state=initialState,action)=>{
    return state;
}