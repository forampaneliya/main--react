import {createStore,combineReducers,applyMiddleware} from "redux"
import { userReducer } from "./Reducer/userReducers"
import { thunk } from "redux-thunk"
import { addcartRerducers } from "./Reducer/addcartReducers"

const Rootreducers=combineReducers({
    userReducer,
    addcartRerducers
})

export const store=createStore(Rootreducers,applyMiddleware(thunk))