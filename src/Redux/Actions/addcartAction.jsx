import axios from "axios";
import { ADD_TO_CART, GET_CART } from "../ActionType";

export const AddcartAction=(data)=>async(dispatch)=>{
    let addcartpro=await axios.post("http://localhost:4000/cart",data)
    dispatch({
        type:ADD_TO_CART,
        payload:addcartpro
    })

}

export const getcartAction=(userid)=>async(dispatch)=>{
    let getcart=await axios.get("http://localhost:4000/cart?userId="+userid)
    console.log("FFF")
    console.log(getcart.data);

    dispatch({
        type:GET_CART,
        payload:getcart.data
    })
}