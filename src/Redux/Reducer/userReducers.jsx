import { GET_USER, REMOVE_USER, SET_USER } from "../ActionType";

const initialValue = {
    userInitialvalue: {}
}

export const userReducer = (state = initialValue, action) => {
    switch (action.type) {
        case SET_USER: {
            localStorage.setItem("user",JSON.stringify(action.payload))

            return{
                ...state,userInitialvalue:action.payload
            }
        }
        case GET_USER:{
           let getdata=JSON.parse(localStorage.getItem("user"))
            return{
                ...state,userInitialvalue:getdata?getdata:{}
            }
        }
        case REMOVE_USER:{
            localStorage.removeItem("user")
            return{
                ...state,userInitialvalue:{}
            }
        }
        default: 
        return state
        

    }
}



