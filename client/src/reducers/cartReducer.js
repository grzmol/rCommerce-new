import AuthService from "../services/authService";
import * as types from "../actions/cartActions";

const auth = new AuthService();
const currentUser = auth.getProfile();


const initState = {
    cart: {},
    user: currentUser,
    error: "",
    fetching: false,
    showAddToMessage: false
}


const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case types.FETCH_CART_REQUEST:
            return {...state, fetching: true};
        case types.FETCH_CART_SUCCESS:
            return {...state, fetching: false, cart: action.payload};
        case types.FETCH_CART_FAIL:
            return { ...state, fetching: false, error: action.payload };
        case types.ADD_TO_CART_REQUEST:
            return {...state, fetching: true};
        case types.ADD_TO_CART_SUCCESS:
            return {...state, fetching: false};
        case types.ADD_TO_CART_FAIL:
            return {...state, fetching: false, error: action.payload}
        case types.SHOW_ADD_TO_MESSAGE:
            return {...state, showAddToMessage: true}
        case types.HIDE_ADD_TO_MESSAGE:
            return {...state, showAddToMessage: false}
        case types.LOADING_ON:
            return {...state, fetching: true}
        case types.LOADING_OFF:
            return {...state, fetching: false}
        default:
            return state;
    }
    return state;

}
export default cartReducer;