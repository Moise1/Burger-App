import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility'; 

const initialState = {
    orders: [],
    loading: false,
    purchased: false,

}

const purchaseInitHelper = (state, action) =>{
    return updateObject(state, {purchased: false }); 
}

const purchaseBurgerStartsHelper = (state, action)  =>{
    return updateObject(state, {loading: true }); 
}

const purchaseBurgerSuccessHelper = (state, action) =>{
    const newOrder = updateObject(action.orderData, {id: action.orderId});
    return updateObject(state, {
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
    })
}

const purchaseBurgerFailsHelper = (state, action)  =>{
    return updateObject(state, {loading: false })
}

const fetchOrderStartsHelper = (state, action) =>{
    return updateObject(state, {loading: true })

}

const fetchOrdersSuccessHelper = (state, action) =>{
    return updateObject(state, {
        orders: action.orders,
        loading: false
    });
}

const fetchOrdersFailedHelper = (state, action) =>{

    return updateObject(state, {loadign: false}); 
}

const orderReducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.PURCHASE_INIT: return purchaseInitHelper(state, action);
        case actionTypes.PURCHASE_BURGER_STARTS: return purchaseBurgerStartsHelper(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccessHelper(state, action);
        case actionTypes.PURCHASE_BURGER_FAILS: return purchaseBurgerFailsHelper(state, action);
        case actionTypes.FETCH_ORDERS_STARTS: return fetchOrderStartsHelper(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccessHelper(state, action);
        case actionTypes.FETCH_ORDERS_FAILED: return fetchOrdersFailedHelper(state, action);
        default: return state;
    }
}

export default orderReducer;