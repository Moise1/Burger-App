import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {

    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }

}

export const purchaseBurgerFails = error => {

    return {
        type: actionTypes.PURCHASE_BURGER_FAILS,
        error: error
    }
}


export const purchaseBurgerStarts = ()=>{
    return {
        type: actionTypes.PURCHASE_BURGER_STARTS
    }
}

export const purchaseBurger = orderData => {
    ;
    return dispatch => {  
        dispatch(purchaseBurgerStarts());
        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch((error) => {
                dispatch(purchaseBurgerFails(error))
            })
    }

}

export const purchaseInt = () =>{
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = orders =>{

    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFailed = error =>{
    return {
        type: actionTypes.FETCH_ORDERS_FAILED, 
        error: error
    }
}

export const fetchOrdersStarts = () =>{
    return {
        type: actionTypes.FETCH_ORDERS_STARTS,
    }
}


export const fetchOrders = ()=>{

    return dispatch =>{
        dispatch(fetchOrdersStarts()); 
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({

                        ...res.data[key],
                        id: key
                    })
                }

                dispatch(fetchOrdersSuccess(fetchedOrders))
                 
            })
            .catch(error => {
               dispatch(fetchOrdersFailed(error))
            })
    }
}