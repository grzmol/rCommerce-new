import axios from "axios";
import AuthService from "../services/authService";

const auth = new AuthService();
const currentUser = auth.getProfile();

export const FETCH_CART_REQUEST = "FETCH_CART_REQUEST";
export const FETCH_CART_SUCCESS = "FETCH_CART_SUCCESS";
export const FETCH_CART_FAIL = "FETCH_CART_FAIL";
export const ADD_TO_CART_REQUEST = "ADD_TO_CART_REQUEST";
export const ADD_TO_CART_SUCCESS = "ADD_TO_CART_SUCCESS";
export const ADD_TO_CART_FAIL = "ADD_TO_CART_FAIL";
export const CREATE_CART_REQUEST = "CREATE_CART_REQUEST";
export const CREATE_CART_SUCCESS = "CREATE_CART_SUCCESS";
export const CREATE_CART_FAIL = "CREATE_CART_FAIL";
export const SHOW_ADD_TO_MESSAGE = "SHOW_ADD_TO_MESSAGE";
export const HIDE_ADD_TO_MESSAGE = "HIDE_ADD_TO_MESSAGE";
export const LOADING_ON = "LOADING_ON";
export const LOADING_OFF = "LOADING_OFF";
export const UPDATE_ITEM_QUANTITY_REQUEST = "UPDATE_ITEM_QUANTITY_REQUEST";
export const UPDATE_ITEM_QUANTITY_SUCCESS = "UPDATE_ITEM_QUANTITY_SUCCESS";
export const UPDATE_ITEM_QUANTITY_FAIL = "UPDATE_ITEM_QUANTITY_FAIL";
export const REMOVE_CART_ITEM_REQUEST = "REMOVE_CART_ITEM_REQUEST";
export const REMOVE_CART_ITEM_SUCCESS = "REMOVE_CART_ITEM_SUCCESS";
export const REMOVE_CART_ITEM_FAIL = "REMOVE_CART_ITEM_FAIL";




export const fetchCart = () => {
    return async dispatch => {
        dispatch({
            type: FETCH_CART_REQUEST
        });
        try {
            const { data, status } = await axios.post('/api/cart', {user: currentUser.username})
            console.log('dfdfs', data);
            if(status === 200 && data){
                dispatch({ type: FETCH_CART_SUCCESS, status, payload: data });
            }else{
                console.log('ddddddddddd')
                dispatch(createCart());
            }

        } catch (error) {
            dispatch({
                type: FETCH_CART_FAIL,
                payload: error.toString()
            });
        }
    };
};

export const createCart = () => {
    return async dispatch => {
        dispatch({
            type: CREATE_CART_REQUEST
        });
        try {
            const { data, status } = await axios.post('/api/cart/new', {user: currentUser.username})
            dispatch(fetchCart());
            dispatch({ type: CREATE_CART_SUCCESS, status, payload: data });
        } catch (error) {
            dispatch({
                type: CREATE_CART_FAIL,
                payload: error.toString()
            });
        }
    };
};

export const addToCart = (itemToAdd) => {
    return async dispatch => {
        dispatch({
            type: ADD_TO_CART_REQUEST
        });
        try {
            const { data, status } = await axios.post('/api/cart/addItem', itemToAdd);
            dispatch(showAddToCartMessage());
            dispatch(fetchCart());
            dispatch({ type: ADD_TO_CART_SUCCESS, status, payload: data });
        } catch (error) {
            dispatch({
                type: ADD_TO_CART_FAIL,
                payload: error.toString()
            });
        }
    };
};


export const updateItemQuantity = (inputData) => {
    return async dispatch => {
        dispatch({
            type: REMOVE_CART_ITEM_REQUEST
        });
        try {
            const { data, status } = await axios.post('/api/cart/updateItemQuantity', inputData);
            dispatch(fetchCart());
           // dispatch({ type: REMOVE_CART_ITEM_SUCCESS, status, payload: data });
        } catch (error) {
            dispatch({
                type: REMOVE_CART_ITEM_FAIL,
                payload: error.toString()
            });
        }
    };
};


export const removeCartItem = (inputData) => {
    return async dispatch => {
        dispatch({
            type: UPDATE_ITEM_QUANTITY_REQUEST
        });
        try {
            const { data, status } = await axios.post('/api/cart/removeFromCart', inputData);
            dispatch(fetchCart());
            dispatch({ type: UPDATE_ITEM_QUANTITY_SUCCESS, status, payload: data });
        } catch (error) {
            dispatch({
                type: UPDATE_ITEM_QUANTITY_FAIL,
                payload: error.toString()
            });
        }
    };
};

export const showAddToCartMessage = () => {
    return async dispatch => {
        dispatch({
            type: SHOW_ADD_TO_MESSAGE
        });
        setTimeout(()=> {
            dispatch({
                type: HIDE_ADD_TO_MESSAGE
            });
        }, 3000);
    };
}

export const loadingOn = () => {
    return async dispatch => {
        dispatch({
            type: LOADING_ON
        });
    };
}

export const loadingOff = () => {
    return async dispatch => {
        dispatch({
            type: LOADING_OFF
        });
    };
}