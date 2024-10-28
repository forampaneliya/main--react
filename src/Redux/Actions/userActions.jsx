import { GET_USER, REMOVE_USER, SET_USER } from "../ActionType";

export const SetuserActions = (data) => {
    return {
        type: SET_USER,
        payload: data
    }
}
export const getuserAction = () => {
    return {
        type: GET_USER
    }
}

export const removeuserAction = () => {
    return {
        type: REMOVE_USER

    }
}