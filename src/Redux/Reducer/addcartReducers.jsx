import { ADD_TO_CART, GET_CART } from "../ActionType";

const initialValue = {
    cartrecord: []
}

export const addcartRerducers = (state = initialValue, action) => {
    console.log(action)
    switch (action.type) {
        case ADD_TO_CART:
            return { ...state, cartrecord: [...state.cartrecord, action.payload] }
        case GET_CART:
            return { ...state, cartrecord: action.payload }
        default: return state;

    }

}